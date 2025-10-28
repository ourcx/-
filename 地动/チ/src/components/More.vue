<template>
  <section id="more" class="more-section">
    <div class="more">
      <div class="more-line margin"></div>
      <div class="more-text margin">SFHNABB</div>
      <div class="more-date margin">
        <Date />
      </div>
      <!-- 分成4份 -->
      <div
        class="more-item"
        v-for="(item, index) in items"
        :key="index"
        :style="{ '--delay': index * 0.1 + 's' }"
      >
        <div class="more-item-overlay"></div>
        <div class="more-item-img">
          <img src="https://s2.loli.net/2025/10/27/t6FkDq1JQXTU7OA.jpg" alt="" />
          <div class="image-overlay"></div>
        </div>
        <div class="more-item-content">
          <div class="more-item-title">{{ item.title }}</div>
          <div class="more-item-desc">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Date from "./Date.vue";
const items = ref([
  {
    title: "作品介绍",
    description: "探索这部作品的深度内涵和创作背景",
  },
  {
    title: "角色解析",
    description: "深入了解每个角色的性格特点和成长历程",
  },
  {
    title: "艺术风格",
    description: "欣赏独特的视觉艺术和画风特色",
  },
  {
    title: "幕后故事",
    description: "揭秘创作过程中的趣事和挑战",
  },
]);
</script>

<style scoped>
.more-section {
  height: 100vh;
}
.more-item-overlay {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, #000, transparent 40%),
    linear-gradient(0deg, #000, transparent 30%),
    linear-gradient(180deg, #000, rgba(0, 0, 0, 0.6) 20%, transparent 40%),
    linear-gradient(-90deg, rgba(0, 0, 0, 0.8), transparent 4rem);
}

/* 四份布局 */
.more {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.more-item {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(50px);
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: var(--delay);
  box-shadow: 
    /* 内阴影 */ inset 0 8px 0 rgba(255, 255, 255, 0.5),
    inset 0 -5px 5px rgba(0, 0, 0, 0.5),
    /* 外阴影 - 多层实现深度感 */ 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 10px 15px -10px rgba(0, 0, 0, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.25),
    /* 发光边框效果 */ 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.more-item:hover {
  transform: translateY(-10px) scale(1.02);
  /* 悬停时的增强阴影 */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.4),
    0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 40px 50px -12px rgba(0, 0, 0, 0.4),
    0 60px 70px -20px rgba(0, 0, 0, 0.5),
    /* 悬停发光效果 */ 0 0 20px rgba(78, 205, 196, 0.2), 0 0 0 1px rgba(78, 205, 196, 0.1);
}

.more-item-img {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.more-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.more-item:hover .more-item-img img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.5) 100%
  );
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.more-item:hover .image-overlay {
  opacity: 0.8;
}

.more-item-content {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 200;
  padding-bottom: 10rem;
}

.more-item-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.more-item-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.more-item-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: left 0.5s ease;
}

.more-item-btn:hover::before {
  left: 100%;
}

.more-item-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.more-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
  bottom: 7rem;
}

.margin {
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: absolute;
  z-index: 300;
}

.more-text {
  height: 3rem;
  color: rgba(255, 255, 255, 0.1);
  font-size: 5rem;
  bottom: 5.9rem;
  left: 10%;
}

.more-date {
  height: 3rem;
  bottom: 4rem;
  right: 10%;
}

/* 响应式设计 */
@media (min-width: 1024px) {
  .more {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .more {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 3rem 1rem;
  }

  .more-item-img {
    height: 200px;
  }

  .more-item-content {
    padding: 1.5rem;
  }

  .more-item-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .more {
    padding: 2rem 1rem;
  }

  .more-item-img {
    height: 180px;
  }

  .more-item-content {
    padding: 1rem;
  }

  .more-item-title {
    font-size: 1.2rem;
  }

  .more-item-desc {
    font-size: 0.9rem;
  }
}

/* 额外的装饰效果 */
.more::before {
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
  pointer-events: none;
}
</style>
