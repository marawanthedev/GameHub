export type RouteResponse =
    | {
        success: true
        message: string,
        data?: unknown,
        errors?: undefined
        error?: undefined
    }
    | {
        success: false
        message: string
        error?: string
        errors?: Record<string, string[]>
        data?: undefined
    }
