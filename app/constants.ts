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
