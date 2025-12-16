<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import L from "leaflet";
import {
  getMateriales,
  asignarMaterial,
  getHistorialPorLocal,
} from "@/data/materiales";

const props = defineProps({
  visible: Boolean,
  local: Object,
  modoInicial: { type: String, default: "detalle" }, // 'detalle' or 'asignar'
});

const emit = defineEmits(["cerrar", "imagen-cargada", "abierto", "cerrado"]);

const modo = ref(props.modoInicial); // Initialize with modoInicial
const materiales = ref([]);
const materialSeleccionado = ref(null);
const cantidad = ref(1);
const mensaje = ref("");
const historial = ref([]);

let mapInstance = null;
const mapaRef = ref(null);

// Load data when modal opens
const cargarDatos = () => {
  materiales.value = getMateriales();
  if (props.local?.nombre) {
    historial.value = getHistorialPorLocal(props.local.nombre);
  }
};

// Handle material assignment
const asignar = () => {
  if (!materialSeleccionado.value || cantidad.value < 1) {
    mensaje.value = "Selecciona un material y una cantidad válida";
    return;
  }

  const resultado = asignarMaterial(
    materialSeleccionado.value.id,
    cantidad.value,
    props.local.nombre
  );

  mensaje.value = resultado.message;
  if (resultado.success) {
    cargarDatos(); // Refresh stock and history
    cantidad.value = 1;
    materialSeleccionado.value = null;
    setTimeout(() => (mensaje.value = ""), 4000);
  }
};

// Close modal
const cerrarModal = () => {
  emit("cerrar");
  emit("cerrado");
};

// Map setup
watch(
  () => props.visible,
  async (nuevoValor) => {
    if (nuevoValor) {
      document.body.style.overflow = "hidden";
      emit("abierto");
      modo.value = props.modoInicial; // Ensure mode is set when modal opens
      cargarDatos();

      // Wait for modal to render
      await nextTick();

      // Create map
      if (props.local?.lat && props.local?.lng) {
        if (mapInstance) {
          mapInstance.remove();
          mapInstance = null;
        }

        mapInstance = L.map(mapaRef.value).setView(
          [props.local.lat, props.local.lng],
          15
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance);

        L.marker([props.local.lat, props.local.lng])
          .addTo(mapInstance)
          .bindPopup(props.local.nombre)
          .openPopup();
      }
    } else {
      document.body.style.overflow = "auto";
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    }
  }
);

// Handle ESC key
const onKeyDown = (e) => {
  if (e.key === "Escape" && props.visible) {
    cerrarModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown);
  if (mapInstance) {
    mapInstance.remove();
  }
});

// Notify when image loads
const imagenCargada = () => {
  emit("imagen-cargada", props.local.img);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-BO");
};
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="modal" @click.self="cerrarModal">
      <div class="modal-contenido-scroll">
        <span class="cerrar" @click="cerrarModal">×</span>

        <h3>{{ local.nombre }}</h3>

        <!-- Tabs -->
        <div class="pestanas">
          <button
            :class="{ activo: modo === 'detalle' }"
            @click="modo = 'detalle'"
          >
            Detalle del Local
          </button>
          <button
            :class="{ activo: modo === 'asignar' }"
            @click="modo = 'asignar'"
          >
            Asignar Material
          </button>
        </div>

        <!-- Alert Message -->
        <div
          v-if="mensaje"
          class="mensaje-alerta"
          :class="{ error: !mensaje.includes('Asignados') }"
        >
          {{ mensaje }}
        </div>

        <!-- Detail Mode -->
        <div v-if="modo === 'detalle'">
          <p><strong>Ubicación:</strong> {{ local.Ubicacion }}</p>
          <p><strong>Propietario:</strong> {{ local.Propietario }}</p>
          <p><strong>NIT:</strong> {{ local.nit }}</p>
          <p>
            <strong>Fecha de Registro:</strong> {{ formatDate(local.Fecha) }}
          </p>

          <img
            :src="`/Tiendas/${local.img}`"
            :alt="`Foto de ${local.nombre}`"
            class="modal-imagen"
            @load="imagenCargada"
          />

          <div v-if="local.lat && local.lng" ref="mapaRef" class="mapa"></div>
        </div>

        <!-- Assign Material Mode -->
        <div v-if="modo === 'asignar'">
          <h4>Material Promocional Disponible</h4>
          <table class="tabla-material">
            <thead>
              <tr>
                <th>Material</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Cantidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mat in materiales" :key="mat.id">
                <td>{{ mat.nombre }}</td>
                <td>{{ mat.descripcion }}</td>
                <td :class="{ bajo: mat.stock < 10, agotado: mat.stock === 0 }">
                  {{ mat.stock }}
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    :max="mat.stock"
                    v-model.number="cantidad"
                    v-if="materialSeleccionado?.id === mat.id"
                    style="width: 60px"
                  />
                  <span v-else>-</span>
                </td>
                <td>
                  <button
                    class="btn-seleccionar"
                    @click="
                      materialSeleccionado = mat;
                      cantidad = 1;
                    "
                    :disabled="mat.stock === 0"
                  >
                    {{ mat.stock === 0 ? "Agotado" : "Seleccionar" }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            v-if="materialSeleccionado"
            class="btn-asignar-final"
            @click="asignar"
          >
            Asignar {{ cantidad }} de {{ materialSeleccionado.nombre }}
          </button>

          <h4 style="margin-top: 2rem">Historial de Asignaciones</h4>
          <ul class="historial">
            <li v-for="h in historial" :key="h.id">
              {{ h.fecha }} - {{ h.cantidad }} × {{ h.materialNombre }}
            </li>
            <li v-if="historial.length === 0" class="empty">
              Aún no se ha asignado material
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Fondo del modal más claro y suave */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Menos oscuro */
  backdrop-filter: blur(6px); /* Blur más suave y elegante */
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

/* Contenedor principal más luminoso y moderno */
.modal-contenido-scroll {
  background: #ffffff;
  margin: auto;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 760px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12); /* Sombra más suave y natural */
  animation: slideUp 0.4s ease;
  border: 1px solid #e8e8e8; /* Borde sutil para definición */
}

/* Botón cerrar más amigable */
.cerrar {
  float: right;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
  line-height: 1;
}

.cerrar:hover {
  color: #e74c3c;
  transform: scale(1.1);
}

/* Títulos y texto más claros */
.modal-contenido-scroll h3 {
  color: #2c3e50;
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.modal-contenido-scroll p {
  margin: 0.8rem 0;
  color: #444;
  line-height: 1.6;
}

/* Imagen y mapa con mejor presentación */
.modal-imagen {
  width: 90%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  margin: 1.5rem auto;
  display: block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.mapa {
  width: 100%;
  height: 320px;
  margin-top: 1.8rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Animaciones suaves */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar moderna y clara */
.modal-contenido-scroll::-webkit-scrollbar {
  width: 8px;
}

.modal-contenido-scroll::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 10px;
}

.modal-contenido-scroll::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
}

.modal-contenido-scroll::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Pestañas más elegantes */
.pestanas {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0 1.8rem 0;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.pestanas button {
  padding: 10px 24px;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 1.05rem;
  color: #666;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
}

.pestanas button.activo {
  color: #2980b9;
  background-color: #eef5ff;
  border-bottom: 3px solid #2980b9;
}

/* Tabla de materiales más limpia y luminosa */
.tabla-material {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin: 1.2rem 0;
}

.tabla-material th {
  text-align: left;
  padding: 12px 10px;
  color: #2c3e50;
  font-weight: 600;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.tabla-material td {
  padding: 14px 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.tabla-material tr td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.tabla-material tr td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.bajo {
  color: #e67e22;
  font-weight: bold;
}

.agotado {
  color: #e74c3c;
  font-weight: bold;
}

/* Botones más modernos y claros */
.btn-seleccionar {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-seleccionar:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-seleccionar:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.btn-asignar-final {
  background: #27ae60;
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
}

.btn-asignar-final:hover {
  background: #219a52;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(39, 174, 96, 0.35);
}

/* Mensajes más suaves */
.mensaje-alerta {
  padding: 14px;
  border-radius: 10px;
  margin: 1.2rem 0;
  font-weight: 600;
  font-size: 1.02rem;
}

.mensaje-alerta.error {
  background: #fdf2f2;
  color: #c0392b;
  border: 1px solid #f5c6cb;
}

.mensaje-alerta:not(.error) {
  background: #f0f9f4;
  color: #27ae60;
  border: 1px solid #a8e6cf;
}

/* Historial más limpio */
.historial {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.historial li {
  padding: 12px 14px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 4px solid #3498db;
  color: #2c3e50;
}

.historial .empty {
  color: #95a5a6;
  font-style: italic;
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}
</style>
