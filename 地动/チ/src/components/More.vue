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
        @click="openModal(item)"
      >
        <div class="more-item-overlay"></div>
        <div class="more-item-img" :style="{ '--bg-image': `url('${item.src}')` }">
          <img :src="item.src" alt="" />
          <div class="image-overlay"></div>
        </div>
        <div class="more-item-content">
          <div class="more-item-title">{{ item.title }}</div>
          <div class="more-item-desc">
            <div class="text">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Transition name="slide-fade">
    <div v-if="open" class="modal">
      <div class="modal-content"></div>
      <div class="modal-img-content">
        <img :src="modal.src" alt="" />
      </div>
      <div class="modal-text-content">
        <div class="more-item-title">{{ modal.title }}</div>
        <div class="more-item-desc">{{ modal.description }}</div>
      </div>
      <div class="modal-close" @click="open = false">返回X</div>
      <!-- 条带 -->
      <div class="more-item-line"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Date from "./Date.vue";
const items = ref([
  {
    title: "探索作品",
    description: "探索这部作品的深度内涵和创作背景",
    src: "https://s2.loli.net/2025/10/27/t6FkDq1JQXTU7OA.jpg",
  },
  {
    title: "角色解析",
    description: "这是一代代人的故事",
    src: "https://s2.loli.net/2025/10/28/DPWk3GHxYsaqjmE.jpg",
  },
  {
    title: "艺术风格",
    description: "欣赏独特的视觉艺术和画风特色",
    src: "https://s2.loli.net/2025/10/29/fKs2a1Q68cvkDAw.jpg",
  },
  {
    title: "背景故事",
    description: "在十七世纪的欧洲发生的种种",
    src: "https://s2.loli.net/2025/10/29/ciMaPKrukydYE2I.jpg",
  },
]);

interface Item {
  title: string;
  src: string;
  description: string;
}

const open = ref(false);
const modal = ref<Item>({
  title: "标题",
  description: "这是描述",
  src: "https://s2.loli.net/2025/10/27/t6FkDq1JQXTU7OA.jpg",
});
const closeModal = () => {};
const openModal = (item: Item) => {
  open.value = true;
  modal.value = item;
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px) scale(1.1);
  opacity: 0;
}
.modal {
  width: 100%;
  height: 85vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  /* 黑色渐变 */
  z-index: 100;
}

.modal-content {
  width: 100%;
  height: 85vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1), transparent);
  position: fixed;
  z-index: 110;
}
.modal-img-content {
  position: relative;
  z-index: 100;
  overflow: hidden;
}
.modal-img-content img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  transition: all 0.5s ease;
  position: relative;
  z-index: 100;
  /* 图片向下移动 */
}
.modal-close {
  position: absolute;
  bottom: -2vh;
  left: 0;
  width: 10vw;
  height: 5vh;
  background: #ff6b6b;
  z-index: 110;
  text-align: center;
  line-height: 5vh;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  cursor: pointer;
  transition: all 0.5s ease;
}

.modal-close:hover {
  background: #4ecdc4;
}

.modal-text-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85vh;
  z-index: 110;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding-left: 10vw;
}

.more-item-line {
  width: 50%;
  height: 8px;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  margin: 0 auto;
  position: absolute;
  right: 0;
  bottom: -8px;
  z-index: 110;
}
.more-item-line:before {
  content: "";
  pointer-events: none;
  display: block;
  width: 70%;
  height: 8px;
  position: absolute;
  top: 0;
  right: 100%;
  background-image: linear-gradient(90deg, transparent, #ff6b6b);
}

/* .more-item-img::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 10;
} */
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 40px 50px -12px rgba(0, 0, 0, 0.4),
    0 60px 70px -20px rgba(0, 0, 0, 0.5),
    /* 悬停发光效果 */ 0 0 20px rgba(78, 205, 196, 0.3), 0 0 0 1px rgba(78, 205, 196, 0.2);
}

.more-item-img {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.5s ease;
}

.more-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  will-change: transform;
}

.more-item-img::before {
  opacity: 1;
  content: "";
  position: absolute;
  width: 150%;
  height: 40%;
  right: 0;
  bottom: 0;
  top: auto;
  left: auto;
  background-image: var(--bg-image, none);
  background-size: cover;
  background-position: center;
  filter: blur(50px);
  z-index: 10;
  will-change: filter;
  transition: opacity 0.5s ease;
  opacity: 0.6;
}

.more-item:hover .more-item-img img {
  transform: scale(1.1);
}

.more-item:hover .more-item-img::before {
  opacity: 1;
  content: "";
  position: absolute;
  width: 150%;
  height: 40%;
  right: 0;
  bottom: 0;
  top: auto;
  left: auto;
  background-image: var(--bg-image, none);
  background-size: cover;
  background-position: center;
  filter: blur(50px);
  z-index: 10;
  will-change: filter;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  position: relative;
}

.text::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  height: 5px;
  width: 30%;
  background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
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
  z-index: 100;
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
