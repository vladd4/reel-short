type Props = {
  genres: string[]
  className?: string
  pillClassName?: string
  compact?: boolean
}

export default function GenrePills({ genres, className = '', pillClassName, compact }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {genres.filter(Boolean).map((tag) => (
        <span
          key={tag}
          className={`rounded-md font-medium ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1 text-sm'} ${pillClassName ?? ''}`}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: compact ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.7)',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
