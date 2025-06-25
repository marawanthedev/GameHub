'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Loader, PlusCircle, UploadCloud } from 'lucide-react'
import { transformSheetData } from '@/app/util/transformSheetdata'
import { ExcelRow } from '@/app/types/excel'
import { ChartType } from '@prisma/client'
import { CHART, CHART_COLUMN_REQUIREMENTS, CHART_GUIDELINES_HELPER_TEXT, CHART_LABELS, SUPPORTED_CHARTS } from '@/app/constants'
import { RouteResponse } from '@/app/types/action'
import { toast } from 'sonner'

export default function TrendsManagementPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [chartType, setChartType] = useState<ChartType>('PIE')
    const [excelData, setExcelData] = useState<ExcelRow[] | null>(null)
    const [error, setError] = useState('')
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadedFileName(file.name)

        const reader = new FileReader()
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const parsed = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][]

            const result = transformSheetData(parsed)

            if (parsed[0].length !== CHART_COLUMN_REQUIREMENTS[chartType]) {
                setError(`${CHART_LABELS[chartType]} requires exactly ${CHART_COLUMN_REQUIREMENTS[chartType]} columns`)
                setExcelData(null)
            } else {
                setError('')
                setExcelData(result)
            }
        }

        reader.readAsArrayBuffer(file)
    }

    const resetForm = () => {
        setTitle('')
        setExcelData(null)
    }

    const handleSubmit = async () => {
        if (!title || !excelData || error) {
            toast.error('Please complete the form correctly')
            return
        }

        setIsLoading(true)

        const res = await fetch('/api/charts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, type: chartType, data: excelData }),
        })

        const { message, success, error: responseError }: RouteResponse = await res.json()

        if (success) {
            toast.success(message)
            resetForm()
            setShowForm(false)
        } else {
            toast.error(responseError || 'Chart was not added successfully')
        }

        setIsLoading(false)
    }

    return (
        <main className="min-h-screen bg-[#0d1016] text-white p-8">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-semibold mb-6">📊 Manage Trends</h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
                >
                    <PlusCircle size={20} />
                    Add New Chart
                </button>
            </div>

            {/* we can memoized each input to avoid it getting rendered bcs we have lots of controlled inputs, but i believe in this form case, its not much of a benefit to do so , memoization work wont be worth it, i might be wrong thought but thats my take */}
            {showForm && (
                <div className="mt-10 max-w-xl mx-auto bg-[#12151c] border border-[#1f232c] p-6 rounded-2xl shadow-md space-y-6">
                    <p>This Chart Type requires {CHART_COLUMN_REQUIREMENTS[chartType]} columns</p>
                    <p> Follow these guidelines to make sure your data is displayed properly</p>
                    <p>{CHART_GUIDELINES_HELPER_TEXT[chartType]}</p>
                    <div>
                        <label htmlFor="chart-title" className="block text-sm mb-2 font-medium text-gray-300">Chart Title</label>
                        <input
                            id="chart-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Top Genres 2024"
                            className="w-full px-4 py-2 rounded-md bg-[#1b1f27] border border-[#2c313a] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="chart-type-selection" className="block text-sm mb-2 font-medium text-gray-300">Chart Type</label>
                        <select
                            id="chart-type-selection"
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value as ChartType)}
                            className="w-full px-4 py-2 rounded-md bg-[#1b1f27] border border-[#2c313a] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            {SUPPORTED_CHARTS.map((char: CHART) => (
                                <option key={char.id} value={char.type}>
                                    {char.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="file-upload" className="block text-sm mb-2 font-medium text-gray-300">Upload Excel File</label>
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition"
                        >
                            <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
                            <p className="text-gray-400">{uploadedFileName || "Click or drag & drop to upload .xlsx / .xls file"}</p>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2 transition ${isLoading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="animate-spin h-5 w-5" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Chart'
                        )}
                    </button>
                </div>
            )}
        </main>
    )
}
