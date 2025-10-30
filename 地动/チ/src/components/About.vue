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
              故事发生在15世纪的欧洲P国，异端思想受到猛烈迫害的时代。
              神童拉法尔被周围的人寄予厚望，即将跳级进入大学，专攻当时最重要的神学。对于最重视合理性的拉法尔来说，这是理所当然的选择，只要遵循合理性，世界就会变得易如反掌。但是有一天，一名神秘的男子出现在拉法尔身边，他在研究异端思想中的“某个真理”——
              存在着即使舍弃生命也无法改变的信念吗？存在着即使与世界为敌也想要贯彻的美学吗？“遇知”“撼地”“流血”，这是历史上最热血的人们的故事！
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
