export type Cue = { start: number; end: number; text: string }

function parseTime(s: string): number {
  // Normalise SRT comma milliseconds: "00:00:01,000" → "00:00:01.000"
  const parts = s.trim().replace(',', '.').split(':')
  if (parts.length === 3) return +parts[0] * 3600 + +parts[1] * 60 + +parts[2]
  return +parts[0] * 60 + +parts[1]
}

export function parseVTT(raw: string): Cue[] {
  const cues: Cue[] = []
  for (const block of raw.split(/\n\n+/)) {
    const lines = block.trim().split('\n')
    const ti = lines.findIndex((l) => l.includes('-->'))
    if (ti === -1) continue
    const [startStr, rest] = lines[ti].split(' --> ')
    const endStr = rest.trim().split(/\s+/)[0]
    const text = lines.slice(ti + 1).join('\n').trim()
    if (!text) continue
    cues.push({ start: parseTime(startStr), end: parseTime(endStr), text })
  }
  return cues
}
