<script setup>
import { ref, computed } from "vue";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import SearchBar from "@/components/SearchBar.vue";
import LocalesTable from "@/components/LocalesTable.vue";
import LocalModal from "@/components/LocalModal.vue";

import { locales } from "@/data/locales";

const busqueda = ref("");

const localesFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim();
  if (!texto) return locales;

  return locales.filter(
    (local) =>
      local.nombre.toLowerCase().includes(texto) ||
      local.Ubicacion.toLowerCase().includes(texto) ||
      local.Propietario.toLowerCase().includes(texto)
  );
});

// === Modal ===
const modalVisible = ref(false);
const localSeleccionado = ref({});
const modoActual = ref("detalle"); // Nuevo: controla el modo inicial del modal

const abrirModal = (local, modo = "detalle") => {
  localSeleccionado.value = { ...local };
  modoActual.value = modo;           // Guarda el modo recibido
  modalVisible.value = true;
};

const cerrarModal = () => {
  modalVisible.value = false;
  modoActual.value = "detalle";      // Resetea al modo por defecto al cerrar
};
</script>

<template>
  <div class="locales-page">
    <Navbar />

    <main>
      <section class="tabla-container">
        <h2>Locales en La Paz, Bolivia</h2>
        <p class="descripcion">Busca por nombre, ubicación o propietario:</p>

        <SearchBar v-model="busqueda" />

        <!-- La tabla emite 'ver-local' con el local y el modo -->
        <LocalesTable :locales="localesFiltrados" @ver-local="abrirModal" />

        <!-- Pasamos el modo inicial al modal -->
        <LocalModal
          :visible="modalVisible"
          :local="localSeleccionado"
          :modo-inicial="modoActual"
          @cerrar="cerrarModal"
          @imagen-cargada="console.log('Imagen lista:', $event)"
          @abierto="console.log('Modal abierto')"
          @cerrado="console.log('Modal cerrado')"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>