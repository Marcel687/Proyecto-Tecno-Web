<script setup>
defineProps({ modelValue: String });
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    placeholder="Ejemplo: Sopocachi, Café, Lucía..."
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  /* aumentar área táctil y tamaño de letra de la barra de búsqueda */
  padding: clamp(12px, 2vw, 18px) clamp(14px, 3vw, 22px);
  border: 2px solid #003366;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  outline: none;
  transition: box-shadow 0.3s, border-color 0.3s, transform 0.15s;
}

.search-input:focus {
  box-shadow: 0 0 8px rgba(0, 51, 102, 0.5);
  border-color: #ffcc00;
}

/* Placeholder más legible */
.search-input::placeholder {
  font-size: 0.95em;
  color: rgba(0, 0, 0, 0.5);
}
</style>
