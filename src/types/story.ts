import { VideoFormat } from './video-format'

export type Story = {
  info: StoryInfo
  sources: StorySource[]
}

export type StoryInfo = {
  avatar: string
  username: string
  description: string
}

export type StorySource = {
  url: string
  format?: VideoFormat
}
