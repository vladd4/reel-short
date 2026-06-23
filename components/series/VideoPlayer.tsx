'use client'

import PlayerControls from './player/PlayerControls'
import { usePlayerState } from './player/usePlayerState'

type Props = {
  src: string
  title: string
  episode: number
  ratio?: string
  fill?: boolean
  onEnded?: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export default function VideoPlayer({
  src,
  title,
  episode,
  ratio = '16/9',
  fill,
  onEnded,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  const player = usePlayerState(src, onEnded)
  const controlsVisible =
    player.isControlsVisible || player.isSettingsOpen || player.isSubtitlesOpen

  return (
    <div
      ref={player.containerRef}
      onMouseMove={player.resetControlsTimer}
      onClick={(e) => {
        if (e.target === player.videoRef.current) player.togglePlay()
      }}
      className={`relative bg-black select-none ${fill ? 'h-full w-full' : 'w-full'}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <video
        ref={player.videoRef}
        src={src}
        className="h-full w-full object-contain"
        playsInline
        autoPlay
      />

      {!player.playing && (
        <div
          onClick={player.togglePlay}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.22)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7 translate-x-px">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <PlayerControls
        playing={player.playing}
        currentTime={player.currentTime}
        duration={player.duration}
        muted={player.muted}
        volume={player.volume}
        buffered={player.buffered}
        isVisible={controlsVisible}
        isFullscreen={player.isFullscreen}
        isVolumeOpen={player.isVolumeOpen}
        isSettingsOpen={player.isSettingsOpen}
        isSubtitlesOpen={player.isSubtitlesOpen}
        settingsView={player.settingsView}
        speed={player.speed}
        quality={player.quality}
        subtitle={player.subtitle}
        episode={episode}
        title={title}
        hasPrev={hasPrev}
        hasNext={hasNext}
        volumeTrackRef={player.volumeTrackRef}
        volumeLeaveTimerRef={player.volumeLeaveTimerRef}
        settingsPanelRef={player.settingsPanelRef}
        subtitlesPanelRef={player.subtitlesPanelRef}
        onTogglePlay={player.togglePlay}
        onSeek={player.seek}
        onToggleMute={player.toggleMute}
        onToggleFullscreen={player.toggleFullscreen}
        onStartVolumeDrag={player.startVolumeDrag}
        onSetIsVolumeOpen={player.setIsVolumeOpen}
        onOpenSettings={player.openSettings}
        onOpenSubtitles={player.openSubtitles}
        onSpeedChange={player.setSpeed}
        onQualityChange={player.setQuality}
        onSubtitleChange={player.setSubtitle}
        onSettingsViewChange={player.setSettingsView}
        onCloseSettings={() => player.setIsSettingsOpen(false)}
        onCloseSubtitles={() => player.setIsSubtitlesOpen(false)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  )
}
