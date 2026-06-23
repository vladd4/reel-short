import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #0c002b 0%, #1c1559 100%)',
          borderRadius: 40,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(69,0,255,0.5) 0%, transparent 70%)',
          }}
        />
        {/* Play button */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            background: '#4500ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(69,0,255,0.6)',
            position: 'relative',
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    ),
    size,
  )
}
