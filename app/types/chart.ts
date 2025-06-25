import { z } from "zod"
import { ChartTypeEnum } from "../schema/chart"

export type ChartDataPoint = { name: string, value: number }

export type ChartType = z.infer<typeof ChartTypeEnum>

export type UserChart = {
    id: string
    title: string
    type: ChartType
    data: ChartDataPoint[]
    createdAt: string
}

export type ChartBase<TData extends object> = {
    id: string
    title: string
    type: ChartType
    data: TData[]
}