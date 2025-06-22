import React from "react";

export default function GameActionsSkeleton() {
    return (
        <div className="mb-8 flex flex-wrap gap-4 animate-pulse">
            {/* Search Input Skeleton */}
            <div className="h-10 w-full sm:w-72 rounded-lg bg-[#1e242d]" />

            {/* Dropdown Skeleton */}
            <div className="h-10 w-full sm:w-48 rounded-lg bg-[#1e242d]" />
        </div>
    );
}


export const MemoizedGameActionsSkeleton = React.memo(GameActionsSkeleton)