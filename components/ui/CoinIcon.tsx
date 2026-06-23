import type { CSSProperties } from 'react'

type Props = {
  size?: string | number
  color?: string
  style?: CSSProperties
  className?: string
}

export default function CoinIcon({ size = '1em', color = '#e3a119', style, className }: Props) {
  return (
    <span
      className={className}
      style={{ fontSize: size, lineHeight: 1, color, flexShrink: 0, ...style }}
    >
      ◈
    </span>
  )
}
