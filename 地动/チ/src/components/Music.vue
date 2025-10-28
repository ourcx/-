<template>
  <div class="music">
    <!-- 背景粒子效果 -->
    <div class="particles-background">
      <div
        v-for="i in particleCount"
        :key="i"
        class="particle"
        :style="particleStyle(i)"
      ></div>
    </div>

    <!-- 动态光晕效果 -->
    <div class="glow-effect glow-1"></div>
    <div class="glow-effect glow-2"></div>
    <div class="glow-effect glow-3"></div>

    <div class="music-top">
      <!-- 左侧文字动画区域 -->
      <div class="text-section">
        <div class="text-animation">
          <div class="slideText welcome">
            <div class="inner">WELCOME&nbsp;</div>
            <div class="inner">TO</div>
          </div>
          <div class="slideText title">
            <div class="inner">塞壬唱片</div>
          </div>
          <div class="slideText desc">
            <div class="inner">一 个 已 知 或 未 知 的 世 界</div>
          </div>
        </div>
        <!-- 音频可视化装饰 -->
        <div class="visualization">
          <div class="visual-bars">
            <div v-for="i in 32" :key="i" class="visual-bar" :style="barStyle(i)"></div>
          </div>
        </div>
      </div>

      <!-- 右侧波形图区域 -->
      <div class="wavesurfer-section">
        <wavesurfer ref="wavesurferRef"></wavesurfer>
      </div>

      <div class="playlist">
        <h4 class="playlist-title">播放列表</h4>
        <div class="track-list">
          <div
            v-for="(track, index) in playlist"
            :key="track.id"
            class="track-item"
            :class="{ active: currentTrackIndex === index }"
            @click="playTrack(index)"
          >
            <div class="track-number">{{ String(index + 1).padStart(2, "0") }}</div>
            <div class="track-details">
              <div class="track-name">{{ track.name }}</div>
              <div class="track-duration">{{ track.duration }}</div>
            </div>
            <div class="track-status">
              <div
                class="playing-indicator"
                v-if="currentTrackIndex === index && isPlaying"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航提示 -->
    <div class="navigation-hint">
      <div class="hint-content">
        <span>Scroll Down</span>
        <div class="scroll-arrow"></div>
      </div>
    </div>

    <!-- 浮动元素 -->
    <div class="floating-elements">
      <div class="floating-element element-1">♪</div>
      <div class="floating-element element-2">♫</div>
      <div class="floating-element element-3">♬</div>
      <div class="floating-element element-4">🎵</div>
      <div class="floating-element element-5">🎶</div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import Wavesurfer from "./Wavesurfer.vue";
import { ref, onMounted, onUnmounted } from "vue";
const isPlaying = ref(false);
const currentTrackIndex = ref(0);
const wavesurferRef = ref();
const particleCount = 30;

// 粒子样式
const particleStyle = (index: number) => {
  const size = Math.random() * 4 + 1;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  const opacity = Math.random() * 0.3 + 0.1;

  return {
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: opacity.toString(),
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  };
};
const playlist = ref([
  { id: 1, name: "地球の運動 - メインテーマ", duration: "4:32" },
  { id: 2, name: "星の軌跡", duration: "3:45" },
  { id: 3, name: "宇宙のリズム", duration: "5:12" },
  { id: 4, name: "時間の流れ", duration: "4:18" },
  { id: 5, name: "無限の可能性", duration: "6:07" },
]);
// 音频可视化条样式
const barStyle = (index: number) => {
  const height = Math.random() * 60 + 20;
  const delay = index * 0.05;

  return {
    height: `${height}%`,
    animationDelay: `${delay}s`,
  };
};

const playTrack = (index: number) => {
  currentTrackIndex.value = index;
  isPlaying.value = true;
  // 播放指定曲目逻辑
};
</script>

<style scoped>
.music {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

/* 背景粒子效果 */
.particles-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  border-radius: 50%;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(1);
  }
  100% {
    transform: translateY(-100px) rotate(360deg) scale(1);
  }
}

/* 动态光晕效果 */
.glow-effect {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
  filter: blur(40px);
  animation: pulse 8s ease-in-out infinite;
  z-index: 1;
}

.glow-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.glow-2 {
  width: 400px;
  height: 400px;
  bottom: 20%;
  right: 15%;
  animation-delay: 2s;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
}

.glow-3 {
  width: 250px;
  height: 250px;
  top: 60%;
  left: 20%;
  animation-delay: 4s;
  background: radial-gradient(circle, rgba(96, 230, 161, 0.1) 0%, transparent 70%);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.music-top {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
}

/* 左侧文字区域 */
.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 500px;
}

/* 文字动画样式 */
.text-animation {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.slideText {
  position: relative;
  overflow: hidden;
}

.inner {
  color: rgb(212, 216, 221);
  text-shadow: rgba(212, 216, 221, 0.5) 0px -2em 1px;
  transform: translateY(0em);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  white-space: nowrap;
  animation: slideIn 1.5s ease-out forwards;
}

.welcome .inner:nth-child(1) {
  animation-delay: 0.2s;
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.welcome .inner:nth-child(2) {
  animation-delay: 0.4s;
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.title .inner {
  font-size: 3.5rem;
  font-weight: bold;
  animation-delay: 0.6s;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.desc .inner {
  font-size: 1.2rem;
  color: rgba(212, 216, 221, 0.8);
  animation-delay: 0.8s;
  letter-spacing: 4px;
}

@keyframes slideIn {
  0% {
    transform: translateY(-2em);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(0em);
    opacity: 1;
  }
}

/* 右侧波形图区域 */
.wavesurfer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

/* 音频可视化 */
.visualization {
  margin-top: 1rem;
}

.visual-bars {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 3px;
  height: 80px;
}

.visual-bar {
  width: 8px;
  background: linear-gradient(to top, #4ecdc4, #ff6b6b);
  border-radius: 4px;
  animation: barAnimation 1.5s ease-in-out infinite alternate;
}

@keyframes barAnimation {
  0% {
    transform: scaleY(0.3);
  }
  100% {
    transform: scaleY(1);
  }
}

/* 底部导航提示 */
.navigation-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.hint-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-135deg);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 浮动元素 */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 2rem;
  animation: floatElement 20s infinite linear;
}

.element-1 {
  top: 20%;
  left: 5%;
  animation-delay: 0s;
}
.element-2 {
  top: 60%;
  left: 90%;
  animation-delay: 4s;
}
.element-3 {
  top: 80%;
  left: 10%;
  animation-delay: 8s;
}
.element-4 {
  top: 30%;
  left: 85%;
  animation-delay: 12s;
}
.element-5 {
  top: 70%;
  left: 15%;
  animation-delay: 16s;
}

@keyframes floatElement {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .music-top {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .text-section,
  .wavesurfer-section {
    max-width: 100%;
  }

  .text-animation {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .music-top {
    padding: 1rem;
  }

  .title .inner {
    font-size: 2.5rem;
  }

  .welcome .inner,
  .desc .inner {
    font-size: 1rem;
  }

  .play-controls {
    gap: 1rem;
  }

  .play-btn {
    width: 50px;
    height: 50px;
  }
}
/* 播放列表 */
.playlist {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist-title {
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.track-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.track-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.track-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.track-item.active {
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.track-number {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  min-width: 30px;
}

.track-details {
  flex: 1;
}

.track-name {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.track-duration {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.track-status {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.playing-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ecdc4;
  animation: pulse 1.5s infinite;
}
</style>
