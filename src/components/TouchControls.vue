<script setup lang="ts">
defineProps<{
  onLeftStart: () => void
  onLeftEnd: () => void
  onRightStart: () => void
  onRightEnd: () => void
}>()
</script>

<template>
  <div class="touch-controls">
    <div class="touch-zone left" @touchstart="onLeftStart" @touchend="onLeftEnd"></div>
    <div class="touch-zone right" @touchstart="onRightStart" @touchend="onRightEnd"></div>
  </div>
</template>

<style scoped>
.touch-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 10;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
}
</style>
