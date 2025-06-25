
import { Suspense } from 'react'
import SignUpForm from './components/form'
import SignUpSkeleton from './components/skeleton'
import ErrorBoundaryWrapper from '@/app/components/ErrorBoundaryWrapper'

export default function SignupPage({ params }: { params: { locale: string } }) {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#161b22] shadow-xl rounded-2xl p-8 space-y-6 border border-[#30363d]">
                <Suspense fallback={<SignUpSkeleton />}>
                    {/* wrapping here so we make the login page still server and have the login skeleton loaded on server for faster fcp and ttfb */}
                    <ErrorBoundaryWrapper>
                        <SignUpForm locale={params.locale} />
                    </ErrorBoundaryWrapper>
                </Suspense>
            </div>
        </div>
    )
}
