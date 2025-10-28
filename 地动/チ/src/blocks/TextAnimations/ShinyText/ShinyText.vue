<script setup lang="ts">
import { computed } from "vue";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const props = withDefaults(defineProps<ShinyTextProps>(), {
  text: "",
  disabled: false,
  speed: 5,
  className: "",
});

const animationDuration = computed(() => `${props.speed}s`);
</script>

<template>
  <div
    :class="['shiny-text', { 'animate-shine': !props.disabled }, props.className]"
    :style="{ animationDuration: animationDuration }"
  >
    {{ props.text }}
  </div>
</template>

<style scoped>
.shiny-text {
  color: #b5b5b5a4;
  background-clip: text;
  -webkit-background-clip: text;
  display: inline-block;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
}

@keyframes shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.animate-shine {
  /* 循环 */
  animation: shine 5s linear infinite;
}
</style>
