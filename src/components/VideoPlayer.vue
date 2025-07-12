<script setup lang="ts"></script>

<template>
  <div class="video-player">
    <button class="control-btn previous"></button>
    <video>
      <source src="/videos/original/1.mp4" type="video/mp4" />
    </video>
    <button class="control-btn next"></button>

    <div class="dashboard">
      <div class="progress-bar"></div>
      <div class="description">
        <div class="user">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">Upstars</div>
            <div class="subtitle">Test subtitle</div>
          </div>
        </div>
        <div class="controls">
          <button>pause</button>
          <button>close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-player {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 70vh;
  margin: auto;

  .control-btn {
    position: absolute;

    width: 40px;
    height: 40px;
    border-radius: 100%;

    background-color: #030021;

    &.previous {
      left: -64px;
    }

    &.next {
      right: -64px;
    }
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;

    border-radius: 20px;
  }

  .dashboard {
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 100%;
    padding: 24px;

    .progress-bar {
      width: 100%;
      height: 4px;
      background-color: aliceblue;
    }

    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      .user {
        display: flex;
        gap: 16px;
      }

      .controls {
        display: flex;
        gap: 8px;
      }
    }
  }
}
</style>
