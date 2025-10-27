<template>
  <section id="characters" class="characters-section">
    <div class="characters-container">
      <!-- 角色卡片区域 -->
      <div class="characters-content">
        <div class="characters-grid">
          <div
            v-for="(character, index) in characters"
            :key="index"
            class="character-card"
            :class="`character-${index + 1}`"
            @mouseenter="handleCardHover(index)"
            @mouseleave="handleCardLeave"
            @mousemove="handleMouseMove"
            @click="setCanvasImage(character.img)"
          >
            <div class="card-text">{{ character.name }}</div>
            <div class="card-japaneseName">{{ character.japaneseName }}</div>
            <div class="card-occupation">{{ character.occupation }}</div>
            <div class="card-image" :style="getImageStyle(index)">
              <img :src="character.img" :alt="character.name" />
            </div>
            <div class="card-border" :style="getBorderStyle(index)"></div>
          </div>
        </div>
        <Canvas ref="canvasRef" class="canvas-background" :image="currentCanvasImage" />
      </div>

      <!-- 底部线条 -->
      <div class="characters-line">
        <div class="line"></div>
      </div>
    </div>

    <!-- 向上滚动提示 -->
    <div class="scroll-hint up" @click="scrollToPrevSection">
      <div class="scroll-arrow up"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Canvas from "./Canvas.vue";
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  currentSection: string;
  scrollToPrevSection: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  currentSection: "characters",
  scrollToPrevSection: () => {},
});

// 角色数据
const characters = ref([
  {
    name: "地动说",
    japaneseName: "地動説",
    img: "https://s2.loli.net/2025/10/27/Ph85a3yfq9n2tZs.png",
    occupation: "地球是运动还是静止的",
  },
  {
    name: "诺瓦克",
    japaneseName: "ノヴァク",
    img: "https://s2.loli.net/2025/10/27/wQyMobUzEpaYBGn.png",
    age: "62岁",
    occupation: "学者",
    description: "经验丰富的老学者，对传统理论持有怀疑态度。",
  },
  {
    name: "艾莉丝",
    japaneseName: "エリス",
    img: "https://s2.loli.net/2025/10/27/wQyMobUzEpaYBGn.png",
    age: "24岁",
    occupation: "研究助手",
    description: "勇敢的女助手，暗中支持拉法尔的研究。",
  },
  {
    name: "托马斯",
    japaneseName: "トーマス",
    img: "https://s2.loli.net/2025/10/27/wQyMobUzEpaYBGn.png",
    age: "45岁",
    occupation: "审判官",
    description: "宗教裁判所的审判官，坚信地球是宇宙的中心。",
  },
]);
interface LogoItem {
  label: string;
  url: string;
}

// 响应式数据
const activeCardIndex = ref(-1);
const mousePosition = ref({ x: 0, y: 0 });
const currentCanvasImage = ref<LogoItem>();
const canvasRef = ref();

// 处理卡片悬停
const handleCardHover = (index: number) => {
  activeCardIndex.value = index;
};

// 处理卡片离开
const handleCardLeave = () => {
  activeCardIndex.value = -1;
};

// 处理鼠标移动
const handleMouseMove = (event: MouseEvent) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  };
};

// 设置Canvas图片
const setCanvasImage = (imgSrc: string) => {
  console.log("setCanvasImage");
  if (canvasRef.value) {
    currentCanvasImage.value = {
      url: imgSrc,
      label: "Canvas Image",
    };
  }

  // 如果有Canvas组件的引用，可以调用其方法
  if (canvasRef.value && canvasRef.value.changeImage) {
    canvasRef.value.changeImage(imgSrc);
  }
};

// 获取图片样式
const getImageStyle = (index: number) => {
  if (activeCardIndex.value !== index) {
    return {
      opacity: "0",
      transform: "translateX(100px) scale(0.8)",
    };
  }

  // 计算图片位置，使其跟随鼠标
  const offsetX = mousePosition.value.x - window.innerWidth / 2;
  const offsetY = mousePosition.value.y - window.innerHeight / 2;

  return {
    opacity: "1",
    transform: `translateX(${offsetX * 0.2}px) translateY(${
      offsetY * 0.05
    }px) scale(1.1)`,
    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };
};

// 获取边框样式
const getBorderStyle = (index: number) => {
  if (activeCardIndex.value !== index) {
    return {
      opacity: "0",
      transform: "scale(1)",
    };
  }

  return {
    opacity: "0.6",
    transform: "scale(1.05)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };
};
</script>

<style scoped>
.characters-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.characters-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(78, 205, 196, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 80% 70%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
  z-index: 0;
}

.characters-container {
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* 内容区域 */
.characters-content {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  min-height: 70vh;
  gap: 10rem;
}

.characters-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 2;
}

/* 角色卡片 */
.character-card {
  height: 10%;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  overflow: visible;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  padding: 0 2rem;
  animation: cardEntrance 0.6s ease-out both;
}

.character-card:nth-child(1) {
  animation-delay: 0.1s;
}
.character-card:nth-child(2) {
  animation-delay: 0.2s;
}
.character-card:nth-child(3) {
  animation-delay: 0.3s;
}
.character-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.character-card:hover {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(78, 205, 196, 0.2);
}

.card-text {
  color: #989696;
  font-size: 1.8rem;
  font-weight: 600;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.character-card:hover .card-text {
  color: white;
  transform: translateX(20px);
}

.card-occupation {
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 1rem;
  color: white;
  transform: translateX(10rem);
}
.character-card:hover .card-occupation {
  opacity: 1;
  transform: translateX(5rem);
}

.card-japaneseName {
  color: #4b5f7a;
  font-size: 1rem;
  transform: translateX(2rem);
  transition: color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.character-card:hover .card-japaneseName {
  color: white;
}

.card-image {
  position: absolute;
  right: -100px;
  width: 180px;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 4;
  pointer-events: none;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.card-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

/* 底部线条 */
.characters-line {
  width: 100%;
  height: 1px;
  margin: 2rem auto 0;
  transition: all 0.3s ease;
  transform: scaleX(0);
  transform-origin: left;
  opacity: 0;
  animation: lineEntrance 0.5s ease-out 0.6s forwards;
}

.line {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.7), transparent);
}

@keyframes lineEntrance {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* 向上滚动提示 */
.scroll-hint.up {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-hint.up:hover {
  opacity: 1;
}

.scroll-arrow.up {
  width: 30px;
  height: 30px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-135deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) rotate(-135deg);
  }
  40% {
    transform: translateY(-10px) rotate(-135deg);
  }
  60% {
    transform: translateY(-5px) rotate(-135deg);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .characters-grid {
    max-width: 600px;
  }

  .card-image {
    width: 150px;
    height: 200px;
    right: -80px;
  }
}

@media (max-width: 768px) {
  .characters-container {
    width: 95%;
  }

  .characters-grid {
    max-width: 500px;
  }

  .character-card {
    height: 80px;
    padding: 0 1.5rem;
  }

  .card-text {
    font-size: 1.5rem;
  }

  .card-image {
    width: 120px;
    height: 160px;
    right: -60px;
  }
}

@media (max-width: 480px) {
  .characters-section {
    padding: 1.5rem 0;
  }

  .character-card {
    height: 70px;
    padding: 0 1rem;
  }

  .card-text {
    font-size: 1.3rem;
  }

  .card-image {
    width: 100px;
    height: 140px;
    right: -50px;
  }
}
</style>
