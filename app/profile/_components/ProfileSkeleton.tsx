'use client'

const card = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
}

function Block({ className, dim }: { className: string; dim?: boolean }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ background: dim ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)' }}
    />
  )
}

export default function ProfileSkeleton() {
  return (
    <div style={{ background: '#040405', minHeight: '100vh' }}>
      <div style={{ height: 64 }} />
      <div className="mx-auto max-w-lg space-y-4 px-4 py-10">

        {/* ProfileHeader */}
        <div className="flex flex-col items-center gap-4 rounded-2xl p-8" style={card}>
          <Block className="h-20 w-20 rounded-full" />
          <div className="flex flex-col items-center gap-2">
            <Block className="h-4 w-44" />
            <Block className="h-3 w-32" dim />
          </div>
        </div>

        {/* AccountSettings */}
        <div className="overflow-hidden rounded-2xl" style={card}>
          <div className="px-5 pt-5 pb-3">
            <Block className="h-2.5 w-32" dim />
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
            <Block className="h-3.5 w-28" />
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
          <div className="flex items-center gap-3 px-5 py-3.5">
            <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
            <Block className="h-3.5 w-32" />
          </div>
        </div>

        {/* SubscriptionCard */}
        <div className="rounded-2xl p-5" style={card}>
          <Block className="mb-3 h-2.5 w-24" dim />
          <div className="flex items-center gap-3 py-1">
            <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
            <div className="space-y-2">
              <Block className="h-3.5 w-36" />
              <Block className="h-2.5 w-24" dim />
            </div>
          </div>
        </div>

        {/* CoinBalanceCard */}
        <div className="rounded-2xl p-5" style={card}>
          <Block className="mb-3 h-2.5 w-24" dim />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
              <div className="space-y-2">
                <Block className="h-6 w-16" />
                <Block className="h-2.5 w-24" dim />
              </div>
            </div>
            <Block className="h-9 w-20 rounded-xl" />
          </div>
        </div>

        {/* HowCoinsWork */}
        <div className="rounded-2xl p-5" style={card}>
          <Block className="mb-3 h-2.5 w-28" dim />
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Block className="h-3.5 w-3.5 flex-shrink-0" />
                <Block className="h-3 w-52" dim />
              </div>
            ))}
          </div>
        </div>

        {/* ContactRow */}
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={card}>
          <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
          <Block className="h-3.5 w-20" />
        </div>

        {/* SignOutRow */}
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={card}>
          <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
          <Block className="h-3.5 w-16" dim />
        </div>

      </div>
    </div>
  )
}
