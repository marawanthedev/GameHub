import { ChartType } from "@prisma/client";


export const JWT_SECRET = process.env.JWT_SECRET as string;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'
export const DEFAULT_LOCALE = {
    label: "en",
    value: "en-US",
}

export const SUPPORTED_LOCALES = [
    {
        label: "en",
        value: "en-US",
    },
    {
        label: "de",
        value: "de",
    }
];

export type CHART = { type: ChartType, id: string, label: string }
export const CHART_LABELS: Record<ChartType, string> = {
    'BAR': 'Bar Chart',
    'PIE': 'Pie Chart'
}
export const SUPPORTED_CHARTS: CHART[] = [{ id: 'bar-chart', type: 'BAR', label: CHART_LABELS[ChartType.BAR] }, { id: "pie-chart", type: 'PIE', label: CHART_LABELS[ChartType.PIE] }]
export const CHART_COLUMN_REQUIREMENTS: Record<ChartType, number> = {
    "BAR": 2,
    'PIE': 2
}

export const CHART_GUIDELINES_HELPER_TEXT: Record<ChartType, string> = {
    'BAR': "two columns require this format: name for label & value for value :)",
    'PIE': "two columns requre this format: name for label & value for value :)",
}

