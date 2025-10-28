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
          <ShinyText :text="text" :speed="10" />
        </div>
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
</script>

<style scoped>
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
