<template>
  <div class="audio-player">
    <!-- 左侧音频播放器 -->
    <div class="player-container">
      <!-- 唱片封面 -->
      <div class="album-cover" :class="{ rotating: isPlaying }">
        <div class="vinyl">
          <div class="vinyl-inner">
            <div class="center-hole"></div>
          </div>
        </div>
        <div class="cover-image">
          <div class="cover-placeholder">
            <!-- <span>{{ currentTrack?.name?.charAt(0) || "♪" }}</span> -->
            <img src="https://s2.loli.net/2025/10/27/lYNDRduo64wGnHq.jpg" alt="" />
          </div>
        </div>
      </div>

      <!-- 播放控制 -->
      <div class="player-controls">
        <div class="track-info">
          <h3 class="track-title">{{ currentTrack?.title || currentTrack?.name }}</h3>
          <p class="track-artist">{{ currentTrack?.artist || "Unknown Artist" }}</p>
        </div>

        <div>
          <div class="progress-container">
            <div class="progress-bar" @click="seekAudio">
              <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="time-display">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ currentTrack?.duration || "0:00" }}</span>
            </div>
          </div>

          <div class="control-buttons">
            <button class="control-btn" @click="previousTrack" :disabled="!canGoPrevious">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button class="play-btn" @click="togglePlay">
              <svg v-if="!isPlaying" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <button class="control-btn" @click="nextTrack" :disabled="!canGoNext">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="volume-control">
          <button class="volume-btn" @click="toggleMute">
            <svg
              v-if="isMuted || volume === 0"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M3.63 3.63a.996.996 0 000 1.41L7.29 9H6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h3.29l4.29 4.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM18.52 15c.36-.59.67-1.22.91-1.87.18-.49.76-.69 1.18-.36.64.47 1.07 1.05 1.39 1.7.18.36.73.53 1.09.36.36-.18.53-.73.36-1.09-.42-.84-.96-1.61-1.6-2.29-.36-.4-1-.42-1.36-.06l-.05.05c-.34.34-.37.9-.08 1.29.25.41.46.85.63 1.3.15.41.47.69.9.69.08 0 .17-.01.25-.03.45-.12.78-.51.78-.98 0-.47-.33-.86-.78-.98-.33-.09-.65-.2-.95-.33-.2-.09-.34-.3-.34-.53 0-.26.19-.47.44-.51.85-.17 1.72-.25 2.56-.25.55 0 1 .45 1 1s-.45 1-1 1c-.68 0-1.35.07-2 .2-.46.09-.8.48-.8.95 0 .48.34.87.8.95.64.13 1.23.32 1.78.56z"
              />
            </svg>
            <svg v-else-if="volume < 0.5" viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="currentColor"
                d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="currentColor"
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              />
            </svg>
          </button>
          <div class="volume-bar" @click="setVolume">
            <div
              class="volume-level"
              :style="{ width: (isMuted ? 0 : volume) * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import type { P, Track } from "../types/inte";

// 定义事件
const emit = defineEmits<{
  "play-state-change": [playing: boolean];
  "track-change": [trackId: number];
  "time-update": [data: { trackId: number; currentTime: number }];
}>();

// 音频状态
const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const volume = ref(0.7);
const isLoading = ref(false);
const props = defineProps<P & { isPlaying?: boolean }>();

// 计算属性
const currentTrack = computed(() => props.cur);
const canGoPrevious = computed(() => currentTrack.value && currentTrack.value.id > 1);
const canGoNext = computed(() => currentTrack.value && currentTrack.value.id < 5);

// 音频元素引用
const audioElement = ref<HTMLAudioElement | null>(null);

// 监听父组件的播放状态
watch(
  () => props.isPlaying,
  (newVal) => {
    if (newVal !== undefined && newVal !== isPlaying.value) {
      togglePlay();
    }
  }
);

const loadTrack = async (track: Track) => {
  if (!track.src) {
    console.error("没有音频源:", track);
    return;
  }

  if (audioElement.value) {
    // 先暂停当前播放
    audioElement.value.pause();

    // 设置新的音频源
    audioElement.value.src = track.src;

    // 重置状态
    currentTime.value = 0;
    progress.value = 0;

    // 加载音频
    audioElement.value.load();

    console.log("音频加载成功:", track.src);

    // 如果父组件要求播放，则开始播放
    if (props.isPlaying) {
      playAudio();
    }
  }
};

// 监听当前曲目变化
watch(
  () => props.cur,
  (newTrack) => {
    if (newTrack) {
      loadTrack(newTrack);
      emit("track-change", newTrack.id);
    }
  },
  { immediate: true }
);

// 播放音频
const playAudio = () => {
  if (audioElement.value) {
    console.log("开始播放音频:", audioElement.value);
    audioElement.value
      .play()
      .then(() => {
        isPlaying.value = true;
        emit("play-state-change", true);
      })
      .catch((error) => {
        console.error("播放失败:", error);
      });
  }
};

// 暂停音频
const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause();
    isPlaying.value = false;
    emit("play-state-change", false);
  }
};

// 初始化音频
onMounted(() => {
  audioElement.value = new Audio();
  audioElement.value.volume = volume.value;

  audioElement.value.addEventListener("loadedmetadata", () => {
    duration.value = audioElement.value!.duration;
  });

  audioElement.value.addEventListener("timeupdate", () => {
    if (audioElement.value) {
      currentTime.value = audioElement.value.currentTime;
      progress.value = (currentTime.value / duration.value) * 100;

      // 发送时间更新事件
      if (currentTrack.value) {
        emit("time-update", {
          trackId: currentTrack.value.id,
          currentTime: currentTime.value,
        });
      }
    }
  });

  audioElement.value.addEventListener("ended", () => {
    nextTrack();
  });

  // 设置第一首曲目
  if (currentTrack.value) {
    loadTrack(currentTrack.value);
  }
});

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value = null;
  }
});

// 播放/暂停
const togglePlay = () => {
  if (!audioElement.value || !currentTrack.value) return;

  if (isPlaying.value) {
    pauseAudio();
  } else {
    playAudio();
  }
};

// 下一曲
const nextTrack = () => {
  if (canGoNext.value && currentTrack.value) {
    emit("track-change", currentTrack.value.id + 1);
  }
};

// 上一曲
const previousTrack = () => {
  if (canGoPrevious.value && currentTrack.value) {
    emit("track-change", currentTrack.value.id - 1);
  }
};

// 进度条点击
const seekAudio = (event: MouseEvent) => {
  if (!audioElement.value || !duration.value) return;

  const progressBar = event.currentTarget as HTMLElement;
  const clickPosition = event.offsetX;
  const progressBarWidth = progressBar.offsetWidth;
  const seekTime = (clickPosition / progressBarWidth) * duration.value;

  audioElement.value.currentTime = seekTime;
  currentTime.value = seekTime;
};

// 音量控制
const setVolume = (event: MouseEvent) => {
  const volumeBar = event.currentTarget as HTMLElement;
  const clickPosition = event.offsetX;
  const volumeBarWidth = volumeBar.offsetWidth;

  volume.value = clickPosition / volumeBarWidth;
  if (audioElement.value) {
    audioElement.value.volume = volume.value;
  }
  if (volume.value === 0) {
    isMuted.value = true;
  } else {
    isMuted.value = false;
  }
};

// 静音切换
const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (audioElement.value) {
    audioElement.value.muted = isMuted.value;
  }
};

// 时间格式化
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
</script>

<style scoped>
.audio-player {
  display: flex;
  align-items: center;
  gap: 100px;
  z-index: 1000;
  padding: 20px;
}

.player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 唱片样式 */
.album-cover {
  position: absolute;
  width: 60vh;
  height: 60vh;
  top: 50%;
  left: 37%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  z-index: 1;
}

.album-cover.rotating {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.vinyl {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(45deg, #000, #333);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  position: relative;
}

.center-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
}

.cover-image {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-placeholder {
  font-size: 2rem;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  overflow: hidden;
}

.cover-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

/* 播放控制样式 */
.player-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  width: 270px;
  height: 60vh;
  position: relative;
  z-index: 100;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
}

.track-info {
  text-align: center;
}

.track-title {
  color: white;
  font-size: 2rem;
  margin: 0 0 5px 0;
  font-weight: 600;
}

.track-artist {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.control-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.control-btn,
.play-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.play-btn {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.play-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.volume-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.volume-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-level {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 2px;
  transition: width 0.1s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .audio-player {
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 90%;
    max-width: 300px;
  }

  .text-animation {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .album-cover {
    width: 120px;
    height: 120px;
  }

  .vinyl {
    width: 110px;
    height: 110px;
  }

  .cover-image {
    width: 90px;
    height: 90px;
  }

  .player-controls {
    width: 200px;
  }
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn:disabled:hover {
  background: transparent;
  transform: none;
}
</style>
