import { Suspense } from 'react'
import LoginSkeleton from './components/skeleton'
import LoginForm from './components/form'

async function DelayedLoginForm() {
    // Mimic delay (e.g. fetching user data, session, etc.)
    await new Promise((res) => setTimeout(res, 2000))
    return <LoginForm />
}

export default function LoginPage() {

    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#161b22] shadow-xl rounded-2xl p-8 space-y-6 border border-[#30363d]">
                <Suspense fallback={<LoginSkeleton />}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
