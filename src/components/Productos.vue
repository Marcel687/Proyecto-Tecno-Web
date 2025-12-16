<script setup>
import { ref, onMounted } from "vue";
import PrecioPopup from "./PrecioPopup.vue";
import AdvertenciaPopup from "./AdvertenciaPopup.vue";

defineProps({ listaProductos: Array });

// === Estado de popups ===
const showPrecio = ref(false);
const showAdvertencia = ref(false);
const precioTexto = ref("");
const popupPosition = ref({ top: 0, left: 0 });
const advertenciaPosition = ref({ top: 0, left: 0 });

// === Helper para imágenes en assets ===
const getImageUrl = (filename) => {
  // Simplemente devuelve la ruta absoluta desde la raíz (/).
  // Por ejemplo: si filename es 'producto1.png', la ruta final es '/img/producto1.png'
  return `/${filename}`;
};

// === Mostrar precio ===
const mostrarPrecio = (producto, event) => {
  const precios = {
    1: "Precio: $25 Bs",
    2: "Precio: $30 Bs",
    3: "Precio: $28 Bs",
    4: "Precio: $28 Bs",
  };

  precioTexto.value = precios[producto.id] || "Precio no disponible";

  const rect = event.target.getBoundingClientRect();
  popupPosition.value = {
    top: rect.top + window.scrollY + rect.height / 2,
    left: rect.left + window.scrollX + rect.width / 2,
  };
  showPrecio.value = true;
};

// === Mostrar advertencia +18 ===
const mostrarAdvertencia = (producto, event) => {
  if (producto.id === 1) {
    const rect = event.target.getBoundingClientRect();
    advertenciaPosition.value = {
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX + rect.width / 2,
    };
    showAdvertencia.value = true;
  } else {
    showAdvertencia.value = false;
  }
};

// === Acción combinada: precio + advertencia ===
const mostrarPrecioYAdvertencia = (producto, event) => {
  mostrarPrecio(producto, event);
  mostrarAdvertencia(producto, event);
};

// === Previsualización al pasar el mouse ===
const previsualizarPrecio = (producto, event) => {
  mostrarPrecio(producto, event);
  if (producto.id === 1) mostrarAdvertencia(producto, event);
};

// === Ocultar popups ===
const ocultarPopups = () => {
  showPrecio.value = false;
  showAdvertencia.value = false;
};

// === Cargar al montar (opcional, ya está en el template) ===
onMounted(() => {
  // Los productos ya están en el template con v-for
});
</script>

<template>
  <div class="container">
    <h2>Nuestros Productos</h2>
    <div class="productos-grid">
      <div
        v-for="producto in listaProductos"
        :key="producto.id"
        class="contenido-producto"
        @click="mostrarPrecioYAdvertencia(producto, $event)"
        @mouseenter="previsualizarPrecio(producto, $event)"
        @mouseleave="ocultarPopups"
      >
        <img :src="getImageUrl(producto.img)" :alt="producto.nombre" />
        <div class="descripcion">
          <h3>{{ producto.nombre }}</h3>
          <p>{{ producto.descripcion }}</p>
          <span v-if="producto.advertencia" class="advertencia-tag">
            {{ producto.advertencia }}
          </span>
        </div>
      </div>
    </div>

    <!-- Popups controlados por estado -->
    <PrecioPopup
      :show="showPrecio"
      :precio="precioTexto"
      :position="popupPosition"
    />
    <AdvertenciaPopup :show="showAdvertencia" :position="advertenciaPosition" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh; /* Asegura que ocupe al menos toda la pantalla */
  padding: 40px 20px;
  background-color: #111;
  color: white;
  box-sizing: border-box; /* Para que el padding no afecte el ancho */
}

/* Estilo para el título H2 que está en tu template */
.container h2 {
  text-align: center;
  color: #eee;
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.productos-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.contenido-producto {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #222;
  padding: 30px;
  width: 45%; /* Ajustado un poco para que quepan dos por fila */
  min-width: 400px; /* Ancho mínimo para que no se comprima mucho */
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);

  /* Efectos para los eventos de mouse */
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.contenido-producto:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

/* Este selector de imagen coincide perfectamente */
.contenido-producto img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0; /* Evita que la imagen se encoja */
}

.descripcion {
  max-width: 300px; /* Aumentado un poco */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espacio entre h3, p y el tag */
}
.descripcion h3 {
  margin: 0;
  color: yellow;
  font-size: 1.8rem;
}

.descripcion p {
  margin: 0;
  color: #ccc;
  line-height: 1.5;
}

/* Estilo añadido para la clase '.advertencia-tag' de tu template */
.advertencia-tag {
  background-color: #ffc107; /* Amarillo advertencia */
  color: #111; /* Texto oscuro para contraste */
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: bold;
  display: inline-block; /* Para que el padding funcione */
  align-self: flex-start; /* Para que no ocupe todo el ancho */
}
</style>
