<script setup>
defineProps({
  show: Boolean,
  position: {
    type: Object,
    default: () => ({ top: 0, left: 0 }),
  },
});
</script>

<template>
  <div
    v-if="show"
    class="advertencia-popup"
    :style="{ top: position.top + 'px', left: position.left + 'px' }"
  >
    Solo para mayores de 18 años
  </div>
</template>

<style scoped>
.advertencia-popup {
  position: absolute;
  background: rgba(50, 50, 50, 0.9);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 10;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transform: translateX(-50%); /* centrar horizontal respecto a left */
  pointer-events: none;
}
</style>
