'use client'

import { useEffect, useRef, useState } from 'react'
import { parseVTT, type Cue } from '@/lib/parseVTT'

const SUBTITLE_SRCS: Record<string, string> = {
  English:    '/subtitles/ep-1/en.vtt',
  Spanish:    '/subtitles/ep-1/es.vtt',
  French:     '/subtitles/ep-1/fr.vtt',
  Portuguese: '/subtitles/ep-1/pt.vtt',
  German:     '/subtitles/ep-1/de.vtt',
  Ukrainian:  '/subtitles/ep-1/uk.vtt',
}

export type SettingsView = null | 'speed' | 'quality'

export function usePlayerState(src: string, onEnded?: () => void) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const playingRef = useRef(false)
  const panelOpenRef = useRef(false)
  const settingsPanelRef = useRef<HTMLDivElement>(null)
  const subtitlesPanelRef = useRef<HTMLDivElement>(null)
  const volumeLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const volumeTrackRef = useRef<HTMLDivElement>(null)
  const isDraggingVolume = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false)
  const [settingsView, setSettingsView] = useState<SettingsView>(null)
  const [speed, setSpeed] = useState(1)
  const [quality, setQuality] = useState('Auto (540P)')
  const [subtitle, setSubtitle] = useState('English')
  const [cues, setCues] = useState<Cue[]>([])
  const [currentCue, setCurrentCue] = useState<string | null>(null)

  useEffect(() => {
    playingRef.current = playing
  }, [playing])
  useEffect(() => {
    panelOpenRef.current = isSettingsOpen || isSubtitlesOpen
  }, [isSettingsOpen, isSubtitlesOpen])

  function resetControlsTimer() {
    clearTimeout(timerRef.current)
    setIsControlsVisible(true)
    timerRef.current = setTimeout(() => {
      if (playingRef.current && !panelOpenRef.current) setIsControlsVisible(false)
    }, 3000)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => setPlaying(true)
    const onPause = () => {
      setPlaying(false)
      setIsControlsVisible(true)
    }
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (video.buffered.length) setBuffered(video.buffered.end(video.buffered.length - 1))
    }
    const onLoaded = () => setDuration(video.duration)
    const onEnd = () => onEnded?.()
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('ended', onEnd)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('ended', onEnd)
    }
  }, [onEnded])

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed
  }, [speed])

  useEffect(() => {
    if (subtitle === 'Off') { setCues([]); setCurrentCue(null); return }
    const src = SUBTITLE_SRCS[subtitle]
    if (!src) return
    async function loadCues() {
      try {
        const res = await fetch(src)
        const text = await res.text()
        setCues(parseVTT(text))
      } catch {}
    }
    loadCues()
  }, [subtitle])

  useEffect(() => {
    if (!cues.length) { setCurrentCue(null); return }
    const cue = cues.find((c) => currentTime >= c.start && currentTime <= c.end)
    setCurrentCue(cue?.text ?? null)
  }, [currentTime, cues])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const wasFullscreen = !!document.fullscreenElement
    video.load()
    video.play().catch(() => {})
    if (wasFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {})
    }
  }, [src])

  useEffect(() => {
    if (!isSettingsOpen && !isSubtitlesOpen) return
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node
      if (settingsPanelRef.current?.contains(target) || subtitlesPanelRef.current?.contains(target))
        return
      setIsSettingsOpen(false)
      setIsSubtitlesOpen(false)
      setSettingsView(null)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isSettingsOpen, isSubtitlesOpen])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (playing) video.pause()
    else video.play().catch(() => {})
    resetControlsTimer()
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current
    if (!video || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    video.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(!muted)
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen()
    else document.exitFullscreen()
  }

  function applyVolumeFromY(clientY: number) {
    const track = volumeTrackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const val = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
    const video = videoRef.current
    if (video) {
      video.volume = val
      setVolume(val)
      setMuted(val === 0)
    }
  }

  function startVolumeDrag(e: React.MouseEvent) {
    e.preventDefault()
    isDraggingVolume.current = true
    applyVolumeFromY(e.clientY)
    function onMove(ev: MouseEvent) {
      if (isDraggingVolume.current) applyVolumeFromY(ev.clientY)
    }
    function onUp() {
      isDraggingVolume.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function openSettings() {
    setIsSubtitlesOpen(false)
    setIsSettingsOpen((v) => {
      if (!v) setSettingsView(null)
      return !v
    })
  }

  function openSubtitles() {
    setIsSettingsOpen(false)
    setSettingsView(null)
    setIsSubtitlesOpen((v) => !v)
  }

  return {
    videoRef,
    containerRef,
    settingsPanelRef,
    subtitlesPanelRef,
    volumeTrackRef,
    volumeLeaveTimerRef,
    playing,
    currentTime,
    duration,
    muted,
    volume,
    buffered,
    isControlsVisible,
    isFullscreen,
    isVolumeOpen,
    isSettingsOpen,
    isSubtitlesOpen,
    settingsView,
    speed,
    quality,
    subtitle,
    resetControlsTimer,
    togglePlay,
    seek,
    toggleMute,
    toggleFullscreen,
    startVolumeDrag,
    openSettings,
    openSubtitles,
    setIsVolumeOpen,
    setIsSettingsOpen,
    setIsSubtitlesOpen,
    setSpeed,
    setQuality,
    setSubtitle,
    setSettingsView,
    currentCue,
  }
}
