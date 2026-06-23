import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'My Drama — Watch Short Drama Series Free'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #040405 0%, #0c002b 60%, #1c1559 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(69,0,255,0.35) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: '#4500ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#f2f4f7',
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          My Drama
        </div>

        <div
          style={{
            fontSize: 26,
            color: 'rgba(242,244,247,0.55)',
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          Watch Short Drama Series Free
        </div>

        {/* Bottom genre tags */}
        <div style={{ display: 'flex', gap: 12, marginTop: 48 }}>
          {['Romance', 'Thriller', 'Fantasy', 'Drama'].map((g) => (
            <div
              key={g}
              style={{
                padding: '8px 20px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 18,
              }}
            >
              {g}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
