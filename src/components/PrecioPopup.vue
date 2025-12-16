<script setup>
defineProps({
  show: Boolean,
  precio: String,
  position: {
    type: Object,
    default: () => ({ top: 0, left: 0 }),
  },
});
</script>

<template>
  <div
    v-if="show"
    class="precio-popup"
    :style="{ top: position.top + 'px', left: position.left + 'px' }"
  >
    {{ precio }}
  </div>
</template>

<style scoped>
.precio-popup {
  position: absolute;
  background: rgba(50, 50, 50, 0.9);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 10;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -120%); /* centrar horizontal y mostrar encima */
  pointer-events: none; /* no interferir con hover/clicks debajo */
}
</style>
