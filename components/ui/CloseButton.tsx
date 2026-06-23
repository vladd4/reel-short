import type { CSSProperties } from 'react'

type Props = {
  onClick: () => void
  className?: string
  style?: CSSProperties
}

export default function CloseButton({ onClick, className = '', style }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className={`flex cursor-pointer items-center justify-center transition-colors hover:bg-white/10 ${className}`}
      style={style}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  )
}
