import { ImageResponse } from 'next/og'
import { getSeriesById } from '@/data/series'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ id: string }> }

export default async function OGImage({ params }: Props) {
  const { id } = await params
  const series = getSeriesById(id)

  if (!series) {
    return new ImageResponse((<div style={{ background: '#040405', width: '100%', height: '100%' }} />), size)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
          background: '#040405',
        }}
      >
        {/* Banner image */}
        {series.bannerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={series.bannerImage}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(4,4,5,0.95) 0%, rgba(4,4,5,0.6) 55%, rgba(4,4,5,0.2) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4,4,5,0.8) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '56px 72px',
            width: '65%',
          }}
        >
          {/* Sub-genre badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                padding: '6px 16px',
                borderRadius: 999,
                background: `${series.accentColor}33`,
                border: `1px solid ${series.accentColor}66`,
                color: series.accentColor,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {series.subGenre}
            </div>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#f2f4f7',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {series.title}
          </div>

          <div
            style={{
              fontSize: 22,
              color: 'rgba(242,244,247,0.6)',
              lineHeight: 1.5,
              marginBottom: 32,
              maxWidth: 580,
            }}
          >
            {series.description}
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#e3a119">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span style={{ color: '#e3a119', fontSize: 22, fontWeight: 700 }}>{series.rating}</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }}>
              {series.totalEpisodes} Episodes
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }}>
              {series.views} Views
            </span>
          </div>
        </div>

        {/* Bottom-right branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#4500ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, fontWeight: 500 }}>
            My Drama
          </span>
        </div>
      </div>
    ),
    size,
  )
}
