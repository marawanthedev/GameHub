export default function ConfirmEmailPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#161b22] shadow-xl rounded-2xl p-8 space-y-6 border border-[#30363d] text-center">
                <h1 className="text-2xl font-bold text-blue-400">Confirm your email</h1>
                <p className="text-gray-400 text-sm">
                    We've sent a confirmation link to your email. Please check your inbox and follow the link to complete your registration.
                </p>
                <a
                    href="/"
                    className="inline-block mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Return to Home
                </a>
            </div>
        </div>
    )
}
