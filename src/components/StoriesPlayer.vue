<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

import IconLeftArrow from '@/assets/icons/IconLeftArrow.vue'
import IconRightArrow from '@/assets/icons/IconRightArrow.vue'

import StoryDashboard from './StoryDashboard.vue'
import TouchControls from './TouchControls.vue'

import type { Story } from '@/types/story'
import { VideoFormat } from '@/types/video-format'

import { useTouchStoryControls } from '@/composables/useTouchStoryControls'

const props = defineProps<{
  stories: Story[]
}>()

const currentIndex = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(true)
const isMuted = ref(true)

const progressList = ref<number[]>(props.stories.map(() => 0))

const currentStory = computed(() => props.stories[currentIndex.value])
const currentSources = computed(() => currentStory.value.sources)

const currentVideoUrl = computed(() => {
  return currentSources.value[0]?.url ?? ''
})

function setProgress(index: number, value: number) {
  progressList.value[index] = value
}

const resetAllProgress = () => {
  progressList.value = progressList.value.map(() => 0)
}

const resetCurrentProgress = () => setProgress(currentIndex.value, 0)
const completeCurrentProgress = () => setProgress(currentIndex.value, 100)

const updateProgress = () => {
  const video = videoRef.value
  if (!video || !video.duration) return

  const percent = (video.currentTime / video.duration) * 100
  setProgress(currentIndex.value, percent)
}

const togglePlayback = () => {
  const video = videoRef.value
  if (!video) return

  if (isPlaying.value) {
    video.pause()
  } else {
    video.play().catch((e) => console.warn('Autoplay failed:', e))
  }

  isPlaying.value = !isPlaying.value
}

const toggleMute = () => {
  const video = videoRef.value
  if (!video) return

  video.muted = !video.muted
  isMuted.value = video.muted
}

const reloadVideo = async () => {
  const video = videoRef.value
  if (!video) return

  resetCurrentProgress()
  video.load()
  video.muted = isMuted.value

  try {
    await video.play()
    isPlaying.value = true
  } catch (e) {
    console.warn('Autoplay failed:', e)
    isPlaying.value = false
  }
}

function getMimeType(format?: VideoFormat): string {
  switch (format) {
    case VideoFormat.WEBM:
      return 'video/webm'
    case VideoFormat.AV1:
      return 'video/mp4; codecs="av01.0.05M.08"'
    case VideoFormat.H264:
      return 'video/mp4'
    case VideoFormat.ORIGINAL:
    default:
      return 'video/mp4'
  }
}

const setCurrentStory = (index: number) => {
  if (index < 0) index = 0
  if (index >= props.stories.length) index = 0
  currentIndex.value = index
}

const nextVideo = () => {
  completeCurrentProgress()

  if (currentIndex.value < props.stories.length - 1) {
    setCurrentStory(currentIndex.value + 1)
  } else {
    setCurrentStory(0)
    resetAllProgress()
  }
}

const previousVideo = () => {
  if (currentIndex.value > 0) {
    resetCurrentProgress()
    setCurrentStory(currentIndex.value - 1)
  } else {
    setCurrentStory(0)
    reloadVideo()
  }
}

watch(currentVideoUrl, reloadVideo)

const { onLeftStart, onLeftEnd, onRightStart, onRightEnd } = useTouchStoryControls({
  videoRef,
  onNext: nextVideo,
  onPrevious: previousVideo,
  isPlaying,
})

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowRight':
      nextVideo()
      break
    case 'ArrowLeft':
      previousVideo()
      break
    case ' ':
    case 'Spacebar':
      e.preventDefault()
      togglePlayback()
      break
    case 'm':
    case 'M':
      toggleMute()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="video-player">
    <StoryDashboard
      :username="currentStory.info.username"
      :description="currentStory.info.description"
      :avatar="currentStory.info.avatar"
      :progressList="progressList"
      :isPlaying="isPlaying"
      :isMuted="isMuted"
      @togglePlayback="togglePlayback"
      @toggleMute="toggleMute"
    />

    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      preload="metadata"
      @timeupdate="updateProgress"
      @ended="nextVideo"
    >
      <source
        v-for="(source, index) in currentSources"
        :key="index"
        :src="source.url"
        :type="getMimeType(source.format)"
      />
    </video>

    <button class="control-btn next" @click="nextVideo">
      <IconRightArrow />
    </button>

    <button class="control-btn previous" @click="previousVideo">
      <IconLeftArrow />
    </button>

    <TouchControls
      :onLeftStart="onLeftStart"
      :onLeftEnd="onLeftEnd"
      :onRightStart="onRightStart"
      :onRightEnd="onRightEnd"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/media.scss' as *;

.video-player {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  max-width: 504px;
  height: 70vh;

  margin: auto;
  border-radius: 20px;

  background-color: var(--story-bg);

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  @include tablet {
    max-width: none;
    height: 100dvh;

    border-radius: 0;
  }

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: inherit;
  }

  .control-btn {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    padding: 0;
    margin: 0;

    border: none;
    border-radius: 100%;

    cursor: pointer;

    background-color: var(--story-bg);

    @include tablet {
      display: none;
    }

    &.previous {
      left: -64px;
    }

    &.next {
      right: -64px;
    }
  }
}
</style>
