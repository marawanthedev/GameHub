import { Suspense } from 'react'
import VerifyEmailSkeleton from './components/skeleton'

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<VerifyEmailSkeleton />}>
            {children}
        </Suspense>
    )
}
