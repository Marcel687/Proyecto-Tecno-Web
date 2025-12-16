<script setup>
import { ref, onMounted, computed } from "vue";
import { getComentarios } from "@/services/jsonPlaceHolder";

// 1. Estados reactivos
const comentarios = ref([]);
const mostrarTodos = ref(false); // Controla si se muestran todos o solo 10
const LIMITE_COMENTARIOS = 10;

onMounted(async () => {
  comentarios.value = await getComentarios();
});

// 2. Propiedad computada para mostrar la lista limitada/completa
const comentariosVisibles = computed(() => {
  // Si mostrarTodos es true O si el total es 10 o menos, muestra todos.
  if (mostrarTodos.value || comentarios.value.length <= LIMITE_COMENTARIOS) {
    return comentarios.value;
  }
  // Si no, solo muestra los primeros 10
  return comentarios.value.slice(0, LIMITE_COMENTARIOS);
});

// 3. Propiedad computada para verificar si hay más de 10
const hayMasDeDiez = computed(() => {
  return comentarios.value.length > LIMITE_COMENTARIOS;
});

// 4. Función para cambiar el estado de la visibilidad
const toggleVisibilidad = () => {
  mostrarTodos.value = !mostrarTodos.value;
};
</script>

<template>
  <div class="comentarios-container">
    <h2>Lista de Comentarios</h2>

    <ul class="comentarios-list">
      <li
        v-for="comment in comentariosVisibles"
        :key="comment.id"
        class="comentario-card"
      >
        <div class="comentario-header">
          <strong class="comentario-email">{{ comment.email }}</strong>
        </div>
        <div class="comentario-body">
          <p class="comentario-label">Mensaje:</p>
          <p class="comentario-text">{{ comment.body }}</p>
        </div>
      </li>
    </ul>

    <div v-if="hayMasDeDiez" class="boton-container">
      <button @click="toggleVisibilidad" class="toggle-button">
        {{
          mostrarTodos
            ? "Ver menos ↑"
            : "Ver más (+" + (comentarios.length - LIMITE_COMENTARIOS) + ") ↓"
        }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* (Mantengo los estilos anteriores del formato de tarjeta, solo agrego el del botón) */

/* Estilos para el botón de "Ver más / Ver menos" */
.boton-container {
  text-align: center;
  margin-top: 20px;
}

.toggle-button {
  background-color: #007bff; /* Color primario */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #0056b3;
}

/* --- Estilos de tarjeta anteriores (incluirlos para el formato) --- */
.comentarios-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.comentarios-list {
  list-style: none;
  padding: 0;
}

.comentario-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comentario-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.comentario-header {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
  margin-bottom: 10px;
}

.comentario-email {
  color: #007bff;
  font-size: 1.1em;
  display: block;
}

.comentario-body {
  line-height: 1.5;
}

.comentario-label {
  font-weight: bold;
  color: #555;
  margin: 0 0 5px 0;
  font-size: 0.9em;
}

.comentario-text {
  margin: 0;
  color: #333;
  white-space: pre-wrap;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #007bff;
  display: inline-block;
  padding-bottom: 5px;
}
</style>
