<script setup lang="ts">
import Default from "./layouts/default.vue";
import { ref, onMounted } from "vue";
const currentSection = ref("home");
const isTransitioning = ref(false);

// 单部作品数据
const anime = ref({
  title: "チ。-关于地球的运动-",
  japaneseTitle: "チ。―地球の運動について―",
  description:
    "这是一部关于天文学和人类探索宇宙真理的深刻作品，讲述了在宗教与科学冲突的时代，人们为了真理不惜牺牲一切的故事。作品以精美的画风和深刻的思想内涵赢得了广泛好评。",
  year: "2022",
  author: "魚豊",
  genre: ["科幻", "历史", "剧情"],
  status: "已完结",
});

onMounted(() => {
  // 键盘滚动监听
  window.addEventListener("keydown", handleKeyDown);
  // 鼠标滚轮监听
  window.addEventListener("wheel", handleWheel, { passive: false });
});

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (isTransitioning.value) return;

  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    scrollToNextSection();
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    scrollToPrevSection();
  }
};
const handleWheel = (e: WheelEvent) => {
  if (isTransitioning.value) return;

  e.preventDefault();
  if (e.deltaY > 0) {
    scrollToNextSection();
  } else if (e.deltaY < 0) {
    scrollToPrevSection();
  }
};
const scrollToNextSection = () => {
  const sections = ["home", "about", "characters"];
  const currentIndex = sections.indexOf(currentSection.value);
  if (currentIndex < sections.length - 1) {
    scrollToSection(sections[currentIndex + 1]!);
  }
};

const scrollToPrevSection = () => {
  const sections = ["home", "about", "characters"];
  const currentIndex = sections.indexOf(currentSection.value);
  if (currentIndex > 0) {
    scrollToSection(sections[currentIndex - 1]!);
  }
};

const scrollToSection = (sectionId: string) => {
  if (isTransitioning.value || currentSection.value === sectionId) return;

  isTransitioning.value = true;
  currentSection.value = sectionId;
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "instant" });
    }
    isTransitioning.value = false;
  }, 300);
};
</script>

<template>
  <!-- 隐藏滚动条 -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <span>チ</span>
        <span class="nav-title">{{ anime.title }}</span>
      </div>
      <ul class="nav-links">
        <li>
          <a
            href="#home"
            @click.prevent="scrollToSection('home')"
            :class="{ active: currentSection === 'home' }"
            >首页</a
          >
        </li>
        <li>
          <a
            href="#about"
            @click.prevent="scrollToSection('about')"
            :class="{ active: currentSection === 'about' }"
            >作品介绍</a
          >
        </li>
        <li>
          <a
            href="#characters"
            @click.prevent="scrollToSection('characters')"
            :class="{ active: currentSection === 'characters' }"
            >角色</a
          >
        </li>
      </ul>
    </div>
  </nav>

  <!-- 滚动指示器 -->
  <div class="scroll-indicator">
    <div
      class="scroll-dot"
      :class="{ active: currentSection === 'home' }"
      @click="scrollToSection('home')"
      title="首页"
    ></div>
    <div
      class="scroll-dot"
      :class="{ active: currentSection === 'about' }"
      @click="scrollToSection('about')"
      title="作品介绍"
    ></div>
    <div
      class="scroll-dot"
      :class="{ active: currentSection === 'characters' }"
      @click="scrollToSection('characters')"
      title="角色"
    ></div>
  </div>

  <Default>
    <!-- 路由 -->
    <router-view></router-view>
  </Default>
</template>

<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  background: transparent;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  padding: 0.6rem 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-title {
  font-family: Georgia, "Times New Roman", Times, serif;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.active {
  color: #4ecdc4;
}

.nav-links a.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4ecdc4;
}

/* 主视觉区域 */
.hero-section,
.about-section,
.characters-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-section {
  justify-content: center;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 100%;
}

.logo {
  position: relative;
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-logo {
  position: relative;
  font-size: 20rem;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.line-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: 1;
}

.line-svg path {
  animation: drawPath 2.5s ease-in-out forwards;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

/* 沿着路径运动的小球 */
.orbiting-dot {
  filter: url(#dot-glow);
  opacity: 0;
  animation: fadeInDots 1s ease forwards;
  animation-delay: 2s;
}

.dot-1 {
  animation-delay: 2.2s;
}

.dot-2 {
  animation-delay: 2.4s;
}

@keyframes fadeInDots {
  to {
    opacity: 1;
  }
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: all 1s ease;
  z-index: 0;
}

.glow-effect.active {
  width: 300px;
  height: 300px;
  opacity: 1;
}

.text {
  z-index: 100;
  position: relative;
}

.additional-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: 1;
  pointer-events: none;
}

.line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 3px solid transparent;
  opacity: 0;
  transition: all 1s ease;
}

.line-1 {
  width: 120%;
  height: 120%;
  border-color: rgba(255, 107, 107, 0.3);
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 1s ease;
}

.line-2 {
  width: 140%;
  height: 140%;
  border-color: rgba(78, 205, 196, 0.3);
  transform: translate(-50%, -50%) scale(0.8);
  transition-delay: 0.2s;
  transition: all 1s ease;
}

.line-3 {
  width: 160%;
  height: 160%;
  border-color: rgba(255, 107, 107, 0.2);
  transform: translate(-50%, -50%) scale(0.8);
  transition-delay: 0.4s;
  transition: all 1s ease;
}

.line.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* 主标题内容 */
.hero-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease 0.5s;
  text-align: center;
  z-index: 10;
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: 3rem;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
}

.cta-button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* 通用容器 */
.about-container,
.characters-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 通用部分样式 */
.about-section,
.characters-section {
  background: rgba(15, 23, 42, 0.7);
  padding: 2rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  color: white;
  margin-bottom: 1rem;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.section-subtitle {
  font-size: 1.2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
}

/* 作品介绍区域 */
.anime-header {
  text-align: center;
  margin-bottom: 3rem;
}

.anime-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.anime-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.anime-details {
  color: white;
}

.detail-item {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;
}

.detail-item strong {
  min-width: 80px;
  color: #4ecdc4;
}

.genre-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.description {
  margin-top: 2rem;
}

.description h3 {
  color: #4ecdc4;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.description p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* 角色介绍区域 */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.character-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.character-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.character-info h3 {
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.character-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.scroll-hint:hover {
  opacity: 1;
}

.scroll-hint.up {
  bottom: auto;
  top: 30px;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

.scroll-arrow.up {
  transform: rotate(-135deg);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-10px) rotate(45deg);
  }
  60% {
    transform: translateY(-5px) rotate(45deg);
  }
}

.section-scroll-hints {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  z-index: 100;
}

.section-scroll-hints .scroll-hint {
  position: relative;
  left: auto;
  transform: none;
}

/* 悬停效果 */
.logo:hover {
  filter: drop-shadow(0 0 2em rgba(255, 255, 255, 0.4));
}

.logo:hover .line-svg path {
  stroke-width: 3;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.logo:hover .orbiting-dot {
  filter: url(#dot-glow) drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
}

/* 响应式设计 */
@media (max-width: 768px) {
  .text-logo {
    font-size: 15rem;
  }

  .glow-effect.active {
    width: 250px;
    height: 250px;
  }

  .line-svg {
    width: 110%;
    height: 110%;
  }

  .orbiting-dot {
    r: 4;
  }

  .dot-1 {
    r: 5;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .anime-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .characters-grid {
    grid-template-columns: 1fr;
  }

  .scroll-indicator {
    right: 15px;
  }
}

@media (max-width: 480px) {
  .text-logo {
    font-size: 10rem;
  }

  .glow-effect.active {
    width: 200px;
    height: 200px;
  }

  .line-svg {
    width: 100%;
    height: 100%;
  }

  .orbiting-dot {
    r: 3;
  }

  .dot-1 {
    r: 4;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .character-card {
    flex-direction: column;
    text-align: center;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
<style>
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100%;
}
/* 滚动指示器 */
.scroll-indicator {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.scroll-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.scroll-dot.active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.scroll-dot:hover {
  background: rgba(255, 255, 255, 0.7);
}
</style>
