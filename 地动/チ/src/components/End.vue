<template>
  <div class="end">
    <div>
      <Galaxy class="galaxy" Density="3" :mouseRepulsion="false" :starSpeed="0.001" />
    </div>
    <div class="end-container">
      <!-- 左侧：TiltedCard -->
      <div class="card-section">
        <div class="card-wrapper">
          <TiltedCard
            image-src="https://s2.loli.net/2025/10/27/wQyMobUzEpaYBGn.png"
            alt-text="测试图片"
            caption-text="永远保持好奇心"
            container-height="400px"
            container-width="400px"
            image-height="300px"
            image-width="300px"
            :rotate-amplitude="20"
            :scale-on-hover="1.2"
            :show-mobile-warning="true"
            :show-tooltip="true"
            :display-overlay-content="false"
          >
          </TiltedCard>
        </div>
      </div>

      <!-- 右侧：BounceCards -->
      <div class="bento-section">
        <div class="cards-container">
          <ShinyText :text="text" :speed="11" />
          <br />
          <ShinyText :text="textMusic" :speed="12" />
          <br />
          <ShinyText :text="textMain" :speed="13" />
          <br />
          <ShinyText text="？" :speed="14" />
          <br />
          <ShinyText :text="text1" :speed="15" />
          <br />
          <ShinyText :text="text2" :speed="16" />
          <br />
          <ShinyText :text="text3" :speed="17" />
        </div>
      </div>
    </div>
    <div class="navigation-hint">
      <div class="hint-content">
        <div class="scroll-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard.vue";
import Galaxy from "../blocks/Backgrounds/Galaxy/Galaxy.vue";
import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText.vue";
const text =
  "上帝创造了这个世界，而人类渴望了解世界，我不知道还有哪种欲望比求知欲更高洁。只要能通晓这世间的一切，我愿意付出任何代价。认为知识必须服务于人类以及社会的观点本身就是垃圾。因为渴望了解，所以不断探索，仅此而已。探索真理的路上最为重要的一点是信任，相信自己的直觉，相信世界的美好。无论发生什么事，我都不会否定你的好奇心。";
const textMusic = `诚然，脚下的“大地”肮脏且缺乏秩序，距离那片高贵而完美的“天空”遥不可及。但是这不就意味着我们可以亲眼见证“完美”吗？人可以认知完美，地球就是完美的观测特等席`;
const textMain = `我也不清楚究竟要献上什么才能通晓世界的全貌，不过可以肯定一点，隐匿所知和排除异己都是没用的。我们并不完美，所以才能互相补足。不这么做就无法探索这个世界，人类“是一种社会的动物”。我也感受到了惊奇，我会一直肯定这份惊异与好奇，我要用另一种方式，在怀疑中前行，在笃信中归来。
千言万语汇成一个标点符号：
“？”`;

const text1 = `1468年，
23岁的阿尔伯特进入克拉科夫大学求学随后，他在克拉科夫执教了20年主要教授的科目为数学和自然哲学:
在课上，他曾对当时主流的天动说表示怀疑但并没有提出过明确的结论。`;
const text2 = `1482年，他为当时的天文学教科书《新行星论》"编写了注释书,该书同样是当时各所大学中广泛学习的教材。`;
const text3 = `1491年，一位就读于克拉科夫大学的青年学生通过阿尔伯特编写的注释书学习天文学。这位青年，名为哥白尼。`;
</script>

<style scoped>
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
.overlay-content {
  color: white;
  font-weight: bold;
  padding: 10px;
}

.end {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgba(2, 3, 5, 0.95) 0%,
    rgba(9, 13, 19, 0.9) 50%,
    rgba(1, 1, 1, 0.95) 100%
  );
  backdrop-filter: blur(5px);
}

.galaxy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  opacity: 0.7;
}

.end-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  width: 90%;
  max-width: 1600px;
  position: relative;
  z-index: 1000;
  color: white;
  padding: 40px;
  margin: 40px auto;
  border-radius: 24px;
}

.card-section {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.bento-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 500px;
  gap: 30px;
}

.cards-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 装饰元素 */
.end-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-radius: 50%;
}

.end-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(78, 205, 196, 0.3) 20%,
    rgba(78, 205, 196, 0.6) 50%,
    rgba(78, 205, 196, 0.3) 80%,
    transparent 100%
  );
  border-radius: 50%;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .end-container {
    flex-direction: column;
    gap: 50px;
    padding: 30px;
  }

  .card-section,
  .bento-section {
    width: 100%;
  }

  .bento-section {
    min-height: 400px;
  }

  .section-title {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .end-container {
    width: 95%;
    gap: 40px;
    padding: 20px;
    margin: 20px auto;
    border-radius: 16px;
  }

  .bento-section {
    min-height: 350px;
  }

  .section-title h2 {
    font-size: 1.8rem;
  }

  .cards-container {
    padding: 15px;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .end-container {
    padding: 15px;
  }

  .section-title h2 {
    font-size: 1.6rem;
  }

  .section-title p {
    font-size: 0.9rem;
  }
}
</style>
