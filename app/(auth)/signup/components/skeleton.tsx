export default function SignUpSkeleton() {
    return <div className="space-y-4 animate-pulse text-sm font-medium">
        {[...Array(3)].map((_, i) => (
            <div key={i}>
                <div className="h-4 w-24 bg-[#21262d] rounded mb-2" />
                <div className="h-10 bg-[#21262d] rounded" />
            </div>
        ))}
        <div className="h-10 bg-[#30363d] rounded" />
    </div>
}