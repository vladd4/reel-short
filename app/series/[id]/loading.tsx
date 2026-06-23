function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className ?? ''}`} />
}

export default function SeriesLoading() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero banner skeleton */}
      <Skeleton className="w-full h-[60vw] max-h-[560px] rounded-none" />

      <div className="px-5 md:px-8 mt-8 space-y-6 max-w-2xl">
        {/* Title + meta */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <div className="flex gap-3">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-12 flex-1 rounded-xl" />
          <Skeleton className="h-12 w-12 rounded-xl flex-none" />
        </div>

        {/* Episode list header */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Episodes */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-24 h-16 rounded-lg flex-none" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
