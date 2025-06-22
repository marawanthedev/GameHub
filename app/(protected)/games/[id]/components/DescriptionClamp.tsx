import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function DescriptionClamp({ description }: { description: string }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="text-gray-300 text-lg h-auto">
            <p className={expanded ? '' : 'line-clamp-12'}>{description}</p>

            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition group"
            >
                {expanded ? 'See Less' : 'See More'}
                {expanded ? (
                    <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
                ) : (
                    <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                )}
            </button>
        </div>
    )
}