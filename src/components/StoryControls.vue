<script setup lang="ts">
import IconPause from '@/assets/icons/IconPause.vue'
import IconPlay from '@/assets/icons/IconPlay.vue'
import IconClose from '@/assets/icons/IconClose.vue'
import IconMute from '@/assets/icons/IconVolumeOff.vue'
import IconVolume from '@/assets/icons/IconVolumeOn.vue'

const props = defineProps<{
  isPlaying: boolean
  isMuted: boolean
}>()

const emit = defineEmits<{
  (e: 'togglePlayback'): void
  (e: 'toggleMute'): void
  (e: 'close'): void
}>()
</script>

<template>
  <div class="controls">
    <button class="sound" @click="emit('toggleMute')">
      <component :is="props.isMuted ? IconMute : IconVolume" />
    </button>
    <button class="playback" @click="emit('togglePlayback')">
      <component :is="props.isPlaying ? IconPause : IconPlay" />
    </button>
    <button class="close" @click="emit('close')">
      <IconClose />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/media.scss' as *;

.controls {
  display: flex;
  gap: 16px;

  @include tablet {
    .playback {
      display: none;
    }
  }

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      fill: var(--story-icon-color);
    }
  }
}
</style>
