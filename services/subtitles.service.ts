import type { ApiSubtitleTrack } from '@/types'
import { HttpClient } from './http.client'

class SubtitlesService extends HttpClient {
  async getLanguages(episodeId: number): Promise<string[]> {
    const tracks = await this.get<ApiSubtitleTrack[]>(`/episodes/${episodeId}/subtitles`)
    return tracks.map((t) => t.language)
  }

  async getSrt(episodeId: number, language: string): Promise<string> {
    return this.getText(`/episodes/${episodeId}/subtitles/${language}`)
  }
}

export const subtitlesService = new SubtitlesService()
