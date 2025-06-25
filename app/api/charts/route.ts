import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/app/lib/prisma/client'
import { getCurrentUser, JWTUserPayload } from '@/app/util/getCurrentUser'
import { ChartTypeEnum } from '@/app/schema/chart'
import { RouteResponse } from '@/app/types/action'

const chartSchema = z.object({
    title: z.string().min(1),
    type: ChartTypeEnum,
    data: z.array(z.record(z.any())),
})

export async function POST(req: Request): Promise<NextResponse<RouteResponse>> {
    const jwtPayload: JWTUserPayload | null = await getCurrentUser()

    if (!jwtPayload || !jwtPayload.userId) return NextResponse.json({ error: 'Unauthorized', message: "User is not authorized to create chart, please login", success: false }, { status: 401 })

    const { userId } = jwtPayload

    const body = await req.json()

    const parsed = chartSchema.safeParse(body)

    if (!parsed.success) return NextResponse.json({ success: false, message: "Chart data is invalid!", }, { status: 400 })

    const { title, type, data } = parsed.data

    try {
        await prisma.chart.create({
            data: {
                title,
                type,
                data,
                userId
            },
        })

        return NextResponse.json({ success: true, message: "Chart is added successfully" })
    }
    catch (e) {
        console.error((e as Error).message)
        return NextResponse.json({ success: false, message: "Failed to add chart", error: "Failed to add chart" })
    }
}

export async function GET(): Promise<NextResponse<RouteResponse>> {
    const jwtPayload: JWTUserPayload | null = await getCurrentUser()

    if (!jwtPayload || !jwtPayload.userId) return NextResponse.json({ error: 'Unauthorized', message: "User is not logged in", success: false }, { status: 401 })

    try {
        const charts = await prisma.chart.findMany({
            where: { userId: jwtPayload.userId }, select: {
                id: true,
                title: true,
                type: true,
                data: true,
                createdAt: true
            }
        })
        return NextResponse.json({ message: "Charts retrieved succesffully", success: true, data: charts })
    } catch (e) {
        console.error((e as Error).message)
        return NextResponse.json({ message: "Charts retrieved succesffully", success: false, })

    }
}

export async function DELETE(req: Request) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const chartId = searchParams.get('id')

    if (!chartId) {
        return NextResponse.json({ error: 'Chart ID is required' }, { status: 400 })
    }

    const existingChart = await prisma.chart.findUnique({
        where: { id: chartId },
    })

    if (!existingChart || existingChart.userId !== user.userId) {
        return NextResponse.json({ error: 'Not found or not authorized' }, { status: 404 })
    }

    await prisma.chart.delete({
        where: { id: chartId },
    })

    return NextResponse.json({ success: true, message: 'Chart deleted' })
}
