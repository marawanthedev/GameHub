export type SuccessfulApiResponse = { success: true }
export type UnSuccessfulApiReponse = { success: false, error: string }
export type ApiResponse = SuccessfulApiResponse | UnSuccessfulApiReponse