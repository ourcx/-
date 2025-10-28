<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
const timeInterval = ref<number | null>(null);

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.value = `${hours}:${minutes}`;
};

onMounted(() => {
  updateTime();
  timeInterval.value = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value);
  }
});
</script>

<template>
  <div class="arknights-time-widget" data-style="TIME">
    <div class="time-counter" :style="{ transform: 'translateY(0rem)', opacity: 1 }">
      // {{ currentTime }} //
    </div>
    <div class="time-title" :style="{ transform: 'translateY(0rem)', opacity: 1 }">
      ARKNIGHTS
    </div>
    <div class="time-action" :style="{ transform: 'translateY(0rem)', opacity: 1 }">
      TIME
    </div>
  </div>
</template>

<style scoped>
.arknights-time-widget {
  z-index: 6;
  white-space: nowrap;
  font-family: "Novecentosanswide-DemiBold", "Arial", sans-serif;
  text-align: right;
}

.arknights-time-widget[data-style="TIME"] {
  top: auto;
}

.time-counter {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  letter-spacing: 0.1em;
}

.time-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.time-action {
  color: #ff6b6b;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .arknights-time-widget {
    right: 2rem;
    bottom: 4rem;
    transform: none;
    width: 8rem;
  }

  .time-main {
    font-size: 4rem;
  }

  .time-counter {
    font-size: 0.9rem;
  }

  .time-title {
    font-size: 1rem;
  }

  .time-action {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .arknights-time-widget {
    right: 1rem;
    bottom: 3rem;
    width: 6rem;
  }

  .time-main {
    font-size: 3rem;
  }

  .time-counter {
    font-size: 0.8rem;
  }

  .time-title {
    font-size: 0.8rem;
  }

  .time-action {
    font-size: 0.7rem;
  }
}
</style>
