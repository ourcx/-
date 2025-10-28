<template>
  <section
    id="characters"
    class="characters-section"
    :class="{ active: currentSection === 'characters' }"
  >
    <div class="characters-container">
      <div class="characters-left">
        <div class="section-header">
          <h2 class="section-title">角色介绍</h2>
          <p class="section-subtitle">探索故事中的核心人物</p>
        </div>

        <div class="characters-description">
          <p>
            这部作品描绘了一群勇敢追求真理的角色，他们在宗教与科学的冲突中展现出人性的光辉与复杂。
          </p>
        </div>

        <div class="characters-scroll-container">
          <div class="characters-grid">
            <div
              class="character-card"
              v-for="(character, index) in characters"
              :key="index"
              :style="{ '--card-index': index }"
            >
              <div class="character-avatar">
                <div class="avatar-placeholder">
                  <span class="avatar-text">{{ character.avatarText }}</span>
                </div>
                <div class="character-glow"></div>
              </div>
              <div class="character-info">
                <h3 class="character-name">{{ character.name }}</h3>
                <p class="character-japanese">{{ character.japaneseName }}</p>
                <p class="character-desc">{{ character.description }}</p>
              </div>
              <div class="character-hover-content">
                <div class="character-details">
                  <div class="detail-item">
                    <span class="detail-label">年龄</span>
                    <span class="detail-value">{{ character.age }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">职业</span>
                    <span class="detail-value">{{ character.occupation }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 滚动提示 -->
          <div class="scroll-indicator">
            <div class="scroll-arrow-item left" @click="scrollLeft">
              <span></span>
            </div>
            <div class="scroll-arrow-item right" @click="scrollRight">
              <span></span>
            </div>
          </div>
        </div>

        <!-- 底部基座 -->
        <div class="bottom-base">
          <div class="bottom-base-line"></div>
          <div class="base-dots">
            <div
              class="base-dot"
              v-for="n in characters.length"
              :key="n"
              :class="{ active: n - 1 === currentCardIndex }"
            ></div>
          </div>
        </div>
      </div>

      <div class="characters-right">
        <div class="character-showcase">
          <div class="showcase-bg"></div>
          <div class="showcase-content">
            <h3 class="showcase-title">角色深度解析</h3>
            <p class="showcase-text">
              每个角色都承载着特定的历史背景与思想冲突，他们的选择与命运交织成这部作品的灵魂。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 向上滚动提示 -->
    <div class="scroll-hint up" @click="scrollToPrevSection">
      <div class="scroll-arrow up"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  currentSection: string;
  scrollToPrevSection: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  currentSection: "characters",
  scrollToPrevSection: () => {},
});

// 当前显示的卡片索引
const currentCardIndex = ref(0);

// 角色数据
const characters = [
  {
    name: "拉法尔",
    japaneseName: "ラファウ",
    avatarText: "ラ",
    description: "年轻的天文学者，为了证明地球运动理论不惜挑战宗教权威。",
    age: "28岁",
    occupation: "天文学者",
  },
  {
    name: "诺瓦克",
    japaneseName: "ノヴァク",
    avatarText: "ノ",
    description: "经验丰富的老学者，对传统理论持有怀疑态度。",
    age: "62岁",
    occupation: "学者",
  },
  {
    name: "托马斯",
    japaneseName: "トーマス",
    avatarText: "ト",
    description: "宗教裁判所的审判官，坚信地球是宇宙的中心。",
    age: "45岁",
    occupation: "审判官",
  },
  {
    name: "米开朗基罗",
    japaneseName: "ミケランジェロ",
    avatarText: "ミ",
    description: "艺术家，通过绘画表达对宇宙的思考。",
    age: "38岁",
    occupation: "艺术家",
  },
  {
    name: "卡洛斯·巴特勒",
    japaneseName: "カルロス・バトレ",
    avatarText: "カ",
    description: "音乐家，对宇宙的思考和音乐有独到的见解。",
    age: "42岁",
    occupation: "音乐家",
  },
  {
    name: "伊莎贝拉",
    japaneseName: "イザベラ",
    avatarText: "イ",
    description: "贵族女性，资助科学研究但面临社会压力。",
    age: "32岁",
    occupation: "贵族",
  },
];

// 左右滚动函数
const scrollLeft = () => {
  const grid = document.querySelector(".characters-grid") as HTMLElement;
  if (grid) {
    grid.scrollBy({ left: -320, behavior: "smooth" });
    updateCurrentCardIndex();
  }
};

const scrollRight = () => {
  const grid = document.querySelector(".characters-grid") as HTMLElement;
  if (grid) {
    grid.scrollBy({ left: 320, behavior: "smooth" });
    updateCurrentCardIndex();
  }
};

// 更新当前卡片索引
const updateCurrentCardIndex = () => {
  const grid = document.querySelector(".characters-grid") as HTMLElement;
  if (grid) {
    const scrollLeft = grid.scrollLeft;
    const cardWidth = 300; // 卡片宽度 + gap
    currentCardIndex.value = Math.round(scrollLeft / cardWidth);
  }
};

onMounted(() => {
  const grid = document.querySelector(".characters-grid") as HTMLElement;
  if (grid) {
    grid.addEventListener("scroll", updateCurrentCardIndex);
  }
});
</script>

<style scoped>
.characters-section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f1a2b 0%, #1a2b3c 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.characters-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(78, 205, 196, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
  z-index: 0;
}

.characters-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
  width: 90%;
  max-width: 1400px;
  height: 85%;
  position: relative;
  z-index: 1;
}

.characters-left {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 3rem;
  color: white;
  margin-bottom: 0.5rem;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 700;
  background: linear-gradient(45deg, #fff 30%, #4ecdc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.characters-description p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1.1rem;
}

/* 滚动容器 */
.characters-scroll-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60vw;
}

.characters-scroll-container::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100px;
  background: linear-gradient(90deg, transparent, #1a2b3c);
  z-index: 1000;
}
.characters-scroll-container::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100px;
  background: linear-gradient(-90deg, transparent, #1a2b3c);
  z-index: 1000;
}

.characters-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0rem 2rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  width: 100%;
  scroll-behavior: smooth;
}

/* 隐藏滚动条但保持滚动功能 */
.characters-grid::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.character-card {
  background: rgba(30, 41, 59, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: cardEntrance 0.6s ease-out both;
  animation-delay: calc(var(--card-index) * 0.1s);
  min-width: 200px;
  max-width: 250px;
  height: 350px;
  flex-shrink: 0;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.character-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.character-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(78, 205, 196, 0.3);
}

.character-card:hover::before {
  transform: scaleX(1);
}

.character-avatar {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.character-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(78, 205, 196, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.character-card:hover .character-glow {
  opacity: 1;
}

.character-info {
  text-align: center;
  margin-bottom: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character-name {
  color: white;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.character-japanese {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  font-style: italic;
}

.character-desc {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.95rem;
  flex: 1;
}

.character-hover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.95);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.character-card:hover .character-hover-content {
  transform: translateY(0);
}

.character-details {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
}

.detail-value {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 滚动指示器 */
.scroll-indicator {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.scroll-arrow-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.scroll-arrow-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.scroll-arrow-item span {
  display: block;
  width: 12px;
  height: 12px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
}

.scroll-arrow-item.left span {
  transform: rotate(135deg);
  margin-left: 4px;
}

.scroll-arrow-item.right span {
  transform: rotate(-45deg);
  margin-right: 4px;
}

/* 右侧区域 */
.characters-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.character-showcase {
  position: relative;
  width: 100%;
  height: 80%;
  background: rgba(30, 41, 59, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 30% 70%,
      rgba(255, 107, 107, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.showcase-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 80%;
}

.showcase-title {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.showcase-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
}

/* 底部基座 */
.bottom-base {
  position: relative;
  width: 100%;
  height: 20px;
}

.bottom-base-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4ecdc4, #ff6b6b, transparent);
  margin-bottom: 8px;
}

.base-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.base-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.base-dot.active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
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
  .characters-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .characters-right {
    display: none;
  }
}

@media (max-width: 768px) {
  .characters-container {
    width: 95%;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .character-card {
    min-width: 250px;
    height: 320px;
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .characters-section {
    padding: 1rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .characters-description p {
    font-size: 1rem;
  }

  .character-card {
    min-width: 220px;
    height: 300px;
    padding: 1rem;
  }

  .avatar-placeholder {
    width: 70px;
    height: 70px;
    font-size: 1.5rem;
  }

  .scroll-indicator {
    gap: 1rem;
  }

  .scroll-arrow {
    width: 35px;
    height: 35px;
  }
}
</style>
