import Image from 'next/image'

export default function MyMuseBanner() {
  return (
    <a
      href="https://my-muse.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-2xl px-6 py-5 transition-all hover:brightness-110 active:scale-[0.99]"
      style={{
        background: 'linear-gradient(120deg, #140008 0%, #1a000d 50%, #100010 100%)',
        border: '1px solid rgba(255,47,99,0.15)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Pink glow blob */}
      <div
        className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(255,47,99,0.25) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(243,71,115,0.2) 0%, transparent 70%)' }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255,47,99,0.08)',
            border: '1px solid rgba(255,47,99,0.2)',
          }}
        >
          <Image
            src="/my-muse-logo.png"
            alt="My Muse"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        <div>
          <p
            className="mb-0.5 text-[10px] font-bold tracking-[0.15em] uppercase"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Also from us
          </p>
          <p className="text-base font-bold text-white">My Muse</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Best Short Series Streaming App
          </p>
        </div>
      </div>

      <div
        className="relative flex flex-shrink-0 items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold transition-all group-hover:brightness-110"
        style={{
          background: 'linear-gradient(180deg, #F34773 0%, #BD0433 100%)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(255,47,99,0.45)',
        }}
      >
        Try Free
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
    </a>
  )
}
