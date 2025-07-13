<script setup lang="ts">
import type { Story } from '@/types/story'
import { VideoFormat } from '@/types/video-format'

import StoriesPlayer from './components/StoriesPlayer.vue'

import logo from './assets/icons/logo.png'

const stories: Story[] = [
  {
    info: {
      avatar: logo,
      username: 'Upstars',
      description: 'Benefits',
    },
    sources: [
      {
        url: '/videos/webm/1.webm',
        format: VideoFormat.WEBM,
      },
      {
        url: '/videos/av1/1.mp4',
        format: VideoFormat.AV1,
      },
      {
        url: '/videos/h264/1.mp4',
        format: VideoFormat.H264,
      },
      {
        url: '/videos/original/1.mp4',
      },
    ],
  },
  {
    info: {
      avatar: logo,
      username: 'Upstars',
      description: 'Pets',
    },
    sources: [
      {
        url: '/videos/webm/2.webm',
        format: VideoFormat.WEBM,
      },
      {
        url: '/videos/av1/2.mp4',
        format: VideoFormat.AV1,
      },
      {
        url: '/videos/h264/2.mp4',
        format: VideoFormat.H264,
      },
      {
        url: '/videos/original/2.mp4',
      },
    ],
  },
  {
    info: {
      avatar: logo,
      username: 'Upstars',
      description: 'UPCHARITY 2.0',
    },
    sources: [
      {
        url: '/videos/webm/3.webm',
        format: VideoFormat.WEBM,
      },
      {
        url: '/videos/av1/3.mp4',
        format: VideoFormat.AV1,
      },
      {
        url: '/videos/h264/3.mp4',
        format: VideoFormat.H264,
      },
      {
        url: '/videos/original/3.mp4',
      },
    ],
  },
  {
    info: {
      avatar: logo,
      username: 'Upstars',
      description: 'Pets',
    },
    sources: [
      {
        url: '/videos/original/2.mp4',
      },
    ],
  },
  {
    info: {
      avatar: logo,
      username: 'Upstars',
      description: 'UPCHARITY 2.0',
    },
    sources: [
      {
        url: '/videos/webm/3.webm',
        format: VideoFormat.WEBM,
      },
      {
        url: '/videos/av1/3.mp4',
        format: VideoFormat.AV1,
      },
      {
        url: '/videos/h264/3.mp4',
        format: VideoFormat.H264,
      },
      {
        url: '/videos/original/3.mp4',
      },
    ],
  },
]
</script>

<template>
  <div class="stories-page">
    <StoriesPlayer :stories="stories" />
  </div>
</template>

<style scoped>
.stories-page {
}
</style>
