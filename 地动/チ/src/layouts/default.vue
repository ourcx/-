<template>
  <div class="parallax-container">
    <!-- 进度条 -->
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>

    <!-- 浮动粒子背景 -->
    <div class="floating-particles">
      <div
        v-for="i in particleCount"
        :key="i"
        class="particle"
        :style="particleStyle(i)"
      ></div>
    </div>

    <!-- 背景遮罩层 -->
    <div class="background-overlay"></div>

    <!-- 视差滚动容器 -->
    <div class="viewbox">
      <div class="scrollbox" :style="{ transform: `translateY(${-scrollPosition}px)` }">
        <!-- 使用插槽或默认内容 -->
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrollProgress = ref(0);
const scrollPosition = ref(0);
const scrollboxHeight = ref(0);
const particleCount = 20;

// 预生成粒子样式数据
const particles = ref<
  Array<{
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    left: number;
    top: number;
  }>
>([]);

// 初始化粒子数据
const initializeParticles = () => {
  const newParticles = [];
  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
      left: Math.random() * 100,
      top: Math.random() * 100,
    });
  }
  particles.value = newParticles;
};

// 在组件初始化时立即生成粒子
initializeParticles();

// 生成粒子样式
const particleStyle = (index: number) => {
  const particle = particles.value[index];
  // 安全检查
  if (!particle) {
    return {};
  }
  return {
    width: `${particle.size * 5}px`,
    height: `${particle.size * 5}px`,
    animationDuration: `${particle.duration * 10}s`,
    animationDelay: `${particle.delay}s`,
    opacity: particle.opacity,
    left: `${particle.left}%`,
    top: `${particle.top}%`,
  };
};

// 更新滚动位置和进度条
const handleScroll = () => {
  // 计算滚动进度
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  scrollProgress.value = (window.scrollY / documentHeight) * 100;

  // 应用阻尼效果到scrollbox
  scrollPosition.value = window.scrollY * 0.7; // 阻尼系数
};

// 调整容器高度
const resizeContainer = () => {
  const scrollbox = document.querySelector(".scrollbox") as HTMLElement;
  if (scrollbox) {
    scrollboxHeight.value = scrollbox.offsetHeight;
    document.body.style.height = `${scrollboxHeight.value}px`;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", resizeContainer);
  window.addEventListener("resize", resizeContainer);

  // 初始化
  handleScroll();
  setTimeout(resizeContainer, 100); // 延迟确保DOM已渲染
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("load", resizeContainer);
  window.removeEventListener("resize", resizeContainer);
});
</script>

<style scoped>
/* 样式部分保持不变 */
.parallax-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

/* 视差滚动样式 */
.viewbox {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 20;
}

.scrollbox {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  transition: transform 0.15s ease;
  will-change: transform;
}

/* 背景遮罩 */
.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(30, 41, 59, 0.7) 50%,
    rgba(15, 23, 42, 0.9) 100%
  );
  z-index: 10;
  pointer-events: none;
}

/* 浮动粒子背景 */
.floating-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  border-radius: 50%;
  animation: float 20s infinite linear;
  pointer-events: none;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(75vh) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translateY(50vh) rotate(180deg) scale(1);
  }
  75% {
    transform: translateY(25vh) rotate(270deg) scale(0.9);
  }
  100% {
    transform: translateY(-100px) rotate(360deg) scale(1);
  }
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96e6a1);
  z-index: 1000;
  transition: width 0.1s;
  box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 25;
  padding: 2rem;
  min-height: 1500px;
  width: 100%;
}

.main-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.main-card h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-card p {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }

  .main-card {
    padding: 2rem 1.5rem;
  }

  .main-card h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .main-card h1 {
    font-size: 1.8rem;
  }

  .main-card {
    padding: 1.5rem 1rem;
  }

  .floating-particles {
    display: none; /* 在移动端隐藏粒子效果以提升性能 */
  }
}
</style>
