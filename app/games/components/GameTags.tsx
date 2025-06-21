'use client'

import { useState } from 'react'
import { PlatformInfo } from '@/app/types/rawg'

export default function GameTags({ platforms }: { platforms: PlatformInfo[] }) {
    const [expanded, setExpanded] = useState(false)

    const visiblePlatforms = expanded ? platforms : platforms.slice(0, 3)

    return (
        <div className="flex flex-wrap gap-2">
            {visiblePlatforms.map((platform) => (
                <span
                    key={platform.platform.id}
                    className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full"
                >
                    {platform.platform.name}
                </span>
            ))}

            {platforms.length > 3 && (
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setExpanded(!expanded)
                    }}
                    className="text-xs px-2 py-1 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white transition"
                >
                    {expanded ? '− Less' : '+ More'}
                </button>
            )}
        </div>
    )
}
