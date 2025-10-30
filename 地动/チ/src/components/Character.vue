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
          <p class="section-subtitles">探索故事中的核心人物</p>
        </div>

        <div class="characters-description">
          <p>
            知晓星空后为他们所知晓的真理投向死亡或形同死亡的残酷，不是为了单单描写"知"的代价，而是在星空与烈火中探寻蛇鳞与巫山那般，只在见过以后才毅然抛却无知之美、纵身投入星空之真实的美丽
          </p>
        </div>

        <div class="characters-scroll-container">
          <div class="characters-grid">
            <div
              class="character-card"
              v-for="(character, index) in characters"
              :key="index"
              :style="{ '--card-index': index }"
              :class="{ selected: selectedCharacterIndex === index }"
              @click="selectCharacter(index)"
            >
              <div class="character-avatar">
                <div class="avatar-placeholder">
                  <span class="avatar-text">
                    <img :src="character.avatarText" :alt="character.name" />
                  </span>
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
          <div class="showcase-content" v-if="selectedCharacter">
            <div class="selected-character-avatar">
              <img :src="selectedCharacter.avatarText" :alt="selectedCharacter.name" />
            </div>
          </div>
          <div class="showcase-content default-content" v-else>
            <h3 class="showcase-title">角色深度解析</h3>
            <p class="showcase-text">
              每个角色都承载着特定的历史背景与思想冲突，他们的选择与命运交织成这部作品的灵魂。
            </p>
            <div class="selection-hint">
              <p>点击左侧角色卡片查看详细信息</p>
            </div>
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
import { ref, onMounted, computed } from "vue";

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
// 选中的角色索引
const selectedCharacterIndex = ref<number | null>(null);

// 角色数据
const characters = [
  {
    name: "拉法尔",
    japaneseName: "ラファウ",
    avatarText: "https://s2.loli.net/2025/10/28/dPQBX8FlzSxEkgJ.png",
    description:
      "凭借始终如一的合理判断，顺利地在社会中左右逢源，但却被地动说的美丽之处所吸引，并开始了研究",
    age: "12岁",
    occupation: "天文学者",
  },
  {
    name: "诺瓦克",
    japaneseName: "ノヴァク",
    avatarText: "https://s2.loli.net/2025/10/28/txJK3DNYO987Vkz.png",
    description:
      "虽然并没有特别的思想，但为了保护女儿以及这个世界的平静，他愿意无所顾忌地做任何残酷的事情",
    age: "62岁",
    occupation: "异端审问官",
  },
  {
    name: "休伯特",
    japaneseName: "トーマス",
    avatarText: "https://s2.loli.net/2025/10/28/la7HeAd6Q4BXRVw.png",
    description: "拉法尔的义父波特茨基的熟人，因被禁止的研究而被幽禁的异端者",
    age: "45岁",
    occupation: "异端",
  },
  {
    name: "奥科吉",
    japaneseName: "ミケランジェロ",
    avatarText: "https://s2.loli.net/2025/10/28/Fn1MDRBxo2K4ezs.png",
    description:
      "拥有卓越的视力，却害怕看天空。极度消极，对这个世界没有任何期望，只想尽快去天堂",
    age: "38岁",
    occupation: "雇佣兵",
  },
  {
    name: "巴德尼",
    japaneseName: "カルロス・バトレ",
    avatarText: "https://s2.loli.net/2025/10/28/4qXDEUTowlxRHrG.png",
    description:
      "为了追求人生至高的瞬间，不遵守教会的规定，纯粹地追求知识，结果眼睛被灼伤，贬到了乡下的村庄",
    age: "42岁",
    occupation: "修道士",
  },
  {
    name: "约兰达",
    japaneseName: "イザベラ",
    avatarText: "https://s2.loli.net/2025/10/28/gXyd8hpMr1i3fqc.png",
    description:
      "虽然进入了宇宙学大师的研究所，但却因为是女性而无法充分地进行研究，感到非常绝望",
    age: "32岁",
    occupation: "天文研究助手",
  },
  {
    name: "杜拉卡",
    japaneseName: "ドルカ",
    avatarText: "https://s2.loli.net/2025/10/28/NWT8FJe7KmLQhI4.png",
    description:
      "对村子发展做出巨大贡献的才女，从小失去父亲的经历，让她有赚钱赚到不安消失为止的信念",
    age: "28岁",
    occupation: "移动民族的女孩",
  },
  {
    name: "施密特",
    japaneseName: "シミツ",
    avatarText: "https://s2.loli.net/2025/10/28/wVBriSKdUFNhznZ.png",
    description: "想让被人伦玷污的上帝复活的自然主义者。目前正在为削弱C教正统派而活动着",
    age: "35岁",
    occupation: "异端解放部队的队长",
  },
];

// 计算选中的角色
const selectedCharacter = computed(() => {
  return selectedCharacterIndex.value !== null
    ? characters[selectedCharacterIndex.value]
    : null;
});

// 选择角色
const selectCharacter = (index: number) => {
  selectedCharacterIndex.value = index;
};

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

.section-subtitles {
  color: rgba(255, 255, 255, 0.7);
}

.characters-description p {
  color: rgba(255, 255, 255, 0.8);
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
  cursor: pointer;
}

.character-card.selected {
  border-color: rgba(78, 205, 196, 0.8);
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.4);
  transform: translateY(-5px);
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
  overflow: hidden;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.default-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 1.5rem;
}

.selection-hint {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  font-size: 0.9rem;
}

/* 选中的角色详情样式 */
.selected-character-avatar {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.selected-character-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

@media (max-width: 768px) {
  .characters-container {
    width: 95%;
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

.avatar-text {
  position: relative;
  overflow: hidden;
}

.avatar-text img {
  width: 100%;
  transform: translateY(25%) translateX(10%);
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>
