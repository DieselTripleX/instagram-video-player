import { ref } from 'vue'
import type { Ref } from 'vue'

type ControlOptions = {
  videoRef: Ref<HTMLVideoElement | null>
  onNext: () => void
  onPrevious: () => void
  isPlaying: Ref<boolean>
}

export function useTouchStoryControls({ videoRef, onNext, onPrevious, isPlaying }: ControlOptions) {
  const holdTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
  const wasHeld = ref(false)

  const pauseOnHold = () => {
    wasHeld.value = true
    const video = videoRef.value
    if (video && isPlaying.value) {
      video.pause()
      isPlaying.value = false
    }
  }

  const resumeAfterHold = () => {
    const video = videoRef.value
    if (video && !isPlaying.value) {
      video.play().catch(() => {})
      isPlaying.value = true
    }
  }

  const handleTouchStart = () => {
    wasHeld.value = false
    holdTimeout.value = setTimeout(pauseOnHold, 400)
  }

  const handleTouchEnd = (direction: 'left' | 'right') => {
    if (holdTimeout.value) {
      clearTimeout(holdTimeout.value)
      holdTimeout.value = null
    }

    if (!wasHeld.value) {
      if (direction === 'left') {
        onPrevious()
      } else {
        onNext()
      }
    } else {
      resumeAfterHold()
    }
  }

  return {
    onLeftStart: handleTouchStart,
    onLeftEnd: () => handleTouchEnd('left'),
    onRightStart: handleTouchStart,
    onRightEnd: () => handleTouchEnd('right'),
  }
}
