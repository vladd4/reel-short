type Props = {
  onSignOut: () => void
}

export default function SignOutRow({ onSignOut }: Props) {
  return (
    <button
      onClick={onSignOut}
      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:brightness-125"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: 'rgba(214,0,0,0.08)', border: '1px solid rgba(214,0,0,0.15)' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d60000"
          strokeWidth="2"
          className="h-[18px] w-[18px]"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>
      <p className="text-sm font-semibold" style={{ color: '#d60000' }}>
        Sign Out
      </p>
    </button>
  )
}
