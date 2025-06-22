
import { Suspense } from 'react'
import SignUpForm from './components/form'
import SignUpSkeleton from './components/skeleton'


export default function SignupPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#161b22] shadow-xl rounded-2xl p-8 space-y-6 border border-[#30363d]">
                <Suspense fallback={<SignUpSkeleton />}>
                    <SignUpForm />
                </Suspense>
            </div>
        </div>
    )
}
