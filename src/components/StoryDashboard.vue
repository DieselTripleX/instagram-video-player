<script setup lang="ts">
import StoryControls from './StoryControls.vue'

const props = defineProps<{
  username: string
  description: string
  avatar: string
  progressList: number[]
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
  <div class="dashboard">
    <div class="story-progress">
      <div v-for="(progress, index) in props.progressList" :key="index" class="story-progress-bar">
        <div class="story-progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <div class="description">
      <div class="user">
        <div class="avatar">
          <img :src="props.avatar" alt="avatar" />
        </div>
        <div class="info">
          <div class="name">{{ props.username }}</div>
          <div class="subtitle">{{ props.description }}</div>
        </div>
      </div>

      <StoryControls
        :isPlaying="props.isPlaying"
        :isMuted="props.isMuted"
        @togglePlayback="emit('togglePlayback')"
        @toggleMute="emit('toggleMute')"
        @close="emit('close')"
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding: 24px;

  border-radius: inherit;

  z-index: 11;

  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent);

  .story-progress {
    display: flex;
    width: 100%;
    gap: 4px;

    .story-progress-bar {
      flex: 1;
      height: 4px;
      background-color: var(--story-progress-bg);
      border-radius: 4px;
      overflow: hidden;

      .story-progress-fill {
        height: 100%;
        background-color: var(--story-progress-fill);
        width: 0%;
        transition: width 0.2s ease-in-out;
      }
    }
  }

  .description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .user {
      display: flex;
      gap: 16px;

      .avatar {
        display: flex;
        width: 40px;
        height: 40px;
      }

      .info {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 20px;
          font-weight: 600;
          color: var(--story-username-color);
        }

        .subtitle {
          font-size: 16px;
          color: var(--story-subtext-color);
        }
      }
    }
  }
}
</style>
