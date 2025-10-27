<template>
  <section id="home" class="hero-section" :class="{ active: currentSection === 'home' }">
    <div class="logo-container">
      <div class="logo vue">
        <div class="text-logo">
          <div class="text">チ</div>
          <svg class="line-svg" viewBox="0 0 200 200" width="200" height="200">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e0e0e0" />
                <stop offset="50%" stop-color="#f5f5f5" />
                <stop offset="100%" stop-color="#e0e0e0" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <!-- 定义小球路径 -->
              <path
                id="motion-path"
                d="M50,70
                     C60,40 80,30 100,40 
                     C120,50 130,70 120,90 
                     C110,110 90,120 70,110 
                     C50,100 40,80 50,60 
                     C60,40 80,30 100,40 
                     C120,50 130,70 120,90 
                     C110,110 90,120 70,110 
                     C50,100 40,80 50,60"
                fill="none"
              />
            </defs>
            <!-- 主路径 -->
            <path
              id="text-path"
              d="M45,70
                   C60,40 80,30 100,40 
                   C120,50 130,70 120,90 
                   C110,110 90,120 70,110 
                   C50,100 40,80 50,60 
                   C60,40 80,30 100,40 
                   C120,50 130,70 120,90 
                   C110,110 90,120 70,110 
                   C50,100 40,80 50,60"
              fill="none"
              stroke="url(#lineGradient)"
              stroke-width="2"
              :style="`stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength};`"
              filter="url(#glow)"
            />

            <!-- 沿着路径运动的小球 -->
            <circle class="orbiting-dot dot-1" r="6" fill="url(#dotGradient1)">
              <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#motion-path" />
              </animateMotion>
            </circle>

            <circle class="orbiting-dot dot-2" r="4" fill="url(#dotGradient2)">
              <animateMotion dur="12s" repeatCount="indefinite" rotate="auto" begin="2s">
                <mpath href="#motion-path" />
              </animateMotion>
            </circle>

            <!-- 小球的渐变定义 -->
            <defs>
              <linearGradient id="dotGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="100%" stop-color="#d0d0d0" />
              </linearGradient>
              <linearGradient id="dotGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f8f8f8" />
                <stop offset="100%" stop-color="#c8c8c8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="glow-effect" :class="{ active: dotGradient1 }"></div>
        <div class="additional-lines">
          <div class="line line-1" :class="{ active: dotGradient1 }"></div>
          <div class="line line-2" :class="{ active: dotGradient1 }"></div>
          <div class="line line-3" :class="{ active: dotGradient1 }"></div>
        </div>
      </div>
    </div>

    <!-- 主标题和副标题 -->
    <div class="hero-content" :class="{ visible: dotGradient1 }">
      <h1 class="hero-title">{{ anime.japaneseTitle }}</h1>
      <p class="hero-subtitle">探索宇宙真理的壮阔史诗</p>
      <button class="cta-button" @click="scrollToSection('about')">了解更多</button>
    </div>

    <!-- 向下滚动提示 -->
    <div class="scroll-hint" @click="scrollToNextSection">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
interface Props {
  currentSection?: string;
  scrollToSection?: (section: string) => void;
  anime?: any;
  scrollToNextSection?: () => void;
}

withDefaults(defineProps<Props>(), {
  currentSection: "",
  scrollToSection: () => {},
  anime: {},
  scrollToNextSection: () => {},
});

const pathLength = ref(0);
const dotGradient1 = ref(false);
onMounted(() => {
  // 获取路径长度用于动画
  const path = document.getElementById("text-path") as SVGPathElement | null;
  if (path) {
    pathLength.value = path.getTotalLength();
  }

  setTimeout(() => {
    dotGradient1.value = true;
  }, 2000);
});
</script>
