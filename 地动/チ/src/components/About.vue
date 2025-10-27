<template>
  <section
    id="about"
    class="about-section"
    :class="{ active: currentSection === 'about' }"
  >
    <div class="about-container">
      <div class="anime-header">
        <h2 class="section-title">{{ anime.title }}</h2>
        <p class="section-subtitle">{{ anime.japaneseTitle }}</p>
      </div>

      <div class="anime-content">
        <div class="anime-image">
          <div class="image-placeholder">
            <img :src="anime.image" alt="Anime Image" />
          </div>
        </div>

        <div class="anime-details">
          <div class="detail-item">
            <strong>作者：</strong>
            <span>{{ anime.author }}</span>
          </div>
          <div class="detail-item">
            <strong>年份：</strong>
            <span>{{ anime.year }}</span>
          </div>
          <div class="detail-item">
            <strong>类型：</strong>
            <div class="genre-tags">
              <span v-for="(genre, index) in anime.genre" :key="index" class="genre-tag">
                {{ genre }}
              </span>
            </div>
          </div>
          <div class="detail-item">
            <strong>状态：</strong>
            <span>{{ anime.status }}</span>
          </div>

          <div class="description">
            <h3>作品简介</h3>
            <p>{{ anime.description }}</p>
            <p>
              这部作品深刻探讨了科学与信仰的冲突，以及在追求真理的道路上人类所面临的道德困境。通过精美的艺术表现和深刻的思想内涵，让读者重新思考知识的价值和人类文明的进步。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="section-scroll-hints">
      <div class="scroll-hint up" @click="scrollToPrevSection">
        <div class="scroll-arrow up"></div>
      </div>
      <div class="scroll-hint down" @click="scrollToNextSection">
        <div class="scroll-arrow"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Anime {
  currentSection?: string;
  anime?: any;
  scrollToSection?: any;
  scrollToPrevSection?: any;
  scrollToNextSection?: any;
}

const props = withDefaults(defineProps<Anime>(), {
  currentSection: "about",
  anime: {},
  scrollToSection: () => {},
  scrollToPrevSection: () => {},
  scrollToNextSection: () => {},
});
</script>
