'use client'

import { useEffect, useState } from "react"
import ErrorBoundaryWrapper from "@/app/components/ErrorBoundaryWrapper"
import { RouteResponse } from "@/app/types/action"
import { ChartType } from "@prisma/client"
import { toast } from "sonner"
import { ChartDataPoint, UserChart } from "@/app/types/chart"
import { BarChartComponent, PieChartComponent } from "@/app/components"
import { Loader } from "lucide-react"

export default function TrendsPage() {
    const [charts, setCharts] = useState<UserChart[] | null>(null)
    const [loading, setLoading] = useState(true)


    const fetchCharts = async () => {
        setLoading(true)

        try {
            const res = await fetch('/api/charts', {
                credentials: 'include',
            })

            const { data, message, success }: RouteResponse = await res.json()
            const listOfCharts = data as UserChart[]

            if (!success) {
                toast.error(`${message}`)
            }

            setCharts(listOfCharts)
        } catch (err) {
            console.error((err as Error).message)
            toast.error(`Error Retrieving Charts`)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCharts()
    }, [])

    if (loading) return <div className="text-white text-center py-20 flex-1">Loading trends...</div>

    const handleDeleteChart = async (chartId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this chart?')

        if (!confirmed) return

        try {
            setLoading(true)
            const res = await fetch(`/api/charts?id=${chartId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete chart')

            }

            toast.success('Chart deleted successfully');
        }
        catch (e) {
            console.error((e as Error).message)
            toast.error((e as Error).message || 'Unkown error occured')
        }
        finally {
            setLoading(false)
            fetchCharts()
        }
    }

    const ChartMappper = (chartType: ChartType, data: ChartDataPoint[]) => {
        switch (chartType) {
            case 'BAR':
                return <BarChartComponent<ChartDataPoint>
                    barProps={{
                        dataKey: 'value',
                        label: { position: 'top', fill: 'white', fontSize: 12 },
                    }}
                    xAxisProps={{ dataKey: "name", angle: 90, fontSize: 12, interval: 0 }}
                    data={data}
                    height={400}
                    uniformColor="blue"
                />
            case 'PIE':
                return <PieChartComponent<ChartDataPoint> height={400} biggestPieColor="red" smallestPieColor="yellow" pieProps={{ data, dataKey: "value" }} toolTipProps={{ contentStyle: { backgroundColor: 'blue', border: 'none', color: 'white', fontSize: "14px" }, }} />

        }
    }

    return (
        <main className="min-h-screen bg-[#0d1117] text-white px-4 py-16 ">
            <div className="max-w-7xl mx-auto space-y-16">
                <h1 className="text-4xl font-bold text-white">Your Analytics</h1>
                {charts
                    ?.slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((chart) => {
                        return <section key={chart.id} className="space-y-6">

                            <div className="w-full flex justify-between items-center ">
                                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                                    {chart.title}
                                </h2>
                                <button
                                    onClick={() => handleDeleteChart(chart.id)}
                                    disabled={loading}
                                    className={`w-auto py-2 px-4 rounded-md font-semibold flex items-center justify-center gap-2 transition ${loading ? 'bg-red-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="animate-spin h-5 w-5" />
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete Chart'
                                    )}
                                </button></div>

                            <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                                <ErrorBoundaryWrapper>
                                    {ChartMappper(chart.type, chart.data)}
                                </ErrorBoundaryWrapper>
                            </div>
                        </section>

                    })}
            </div>
        </main>
    )
}
