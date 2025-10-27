<template>
  <section
    id="characters"
    class="characters-section"
    :class="{ active: currentSection === 'characters' }"
  >
    <div class="characters-container">
      <h2 class="section-title">主要角色</h2>
      <div class="characters-grid">
        <div class="character-card">
          <div class="character-avatar">
            <div class="avatar-placeholder">ラファウ</div>
          </div>
          <div class="character-info">
            <h3>拉法尔</h3>
            <p class="character-desc">
              年轻的天文学者，为了证明地球运动理论不惜挑战宗教权威。
            </p>
          </div>
        </div>
        <div class="character-card">
          <div class="character-avatar">
            <div class="avatar-placeholder">ノア</div>
          </div>
          <div class="character-info">
            <h3>诺亚</h3>
            <p class="character-desc">虔诚的宗教信徒，在信仰与科学之间挣扎的复杂角色。</p>
          </div>
        </div>
        <div class="character-card">
          <div class="character-avatar">
            <div class="avatar-placeholder">サラ</div>
          </div>
          <div class="character-info">
            <h3>莎拉</h3>
            <p class="character-desc">支持拉法尔研究的学者，为真理的传播贡献力量。</p>
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
interface Props {
  currentSection: string;
  scrollToPrevSection: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  currentSection: "characters",
  scrollToPrevSection: () => {},
});
</script>
