<template>
  <section id="card" class="characters-section">
    <div class="character-card">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.character-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.character-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background: rgba(255, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  z-index: -1;
  transition: all 0.3s ease;
  transform: scale(0.9);
}
</style>
