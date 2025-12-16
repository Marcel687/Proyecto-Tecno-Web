<script setup>
import { ref, onMounted } from "vue";
import { getMateriales, agregarMaterial } from "@/data/materiales";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

// Estado reactivo
const materiales = ref([]);
const mostrarFormulario = ref(false);
const nuevoMaterial = ref({
  nombre: "",
  descripcion: "",
  stock: 0,
});
const mensaje = ref("");

// Cargar datos al montar el componente
onMounted(() => {
  materiales.value = getMateriales();
});

// Agregar nuevo material
const handleAgregar = () => {
  if (!nuevoMaterial.value.nombre || !nuevoMaterial.value.descripcion) {
    mensaje.value = "Nombre y descripción son obligatorios";
    return;
  }

  agregarMaterial(nuevoMaterial.value);
  materiales.value = getMateriales();

  // Limpiar formulario
  nuevoMaterial.value = { nombre: "", descripcion: "", stock: 0 };
  mostrarFormulario.value = false;
  mensaje.value = "Material agregado correctamente";
  setTimeout(() => (mensaje.value = ""), 3000);
};
</script>

<template>
  <Navbar />
  <div class="material-container">
    <header class="page-header">
      <h1>Material Promocional</h1>
      <button
        @click="mostrarFormulario = !mostrarFormulario"
        class="btn-agregar"
      >
        {{ mostrarFormulario ? "Cancelar" : "Agregar Material" }}
      </button>
    </header>

    <!-- Mensaje de éxito/error -->
    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>

    <!-- Formulario para agregar -->
    <div v-if="mostrarFormulario" class="formulario">
      <h2>Nuevo Material Promocional</h2>
      <form @submit.prevent="handleAgregar">
        <div class="campo">
          <label>Nombre:</label>
          <input v-model="nuevoMaterial.nombre" type="text" required />
        </div>
        <div class="campo">
          <label>Descripción:</label>
          <textarea
            v-model="nuevoMaterial.descripcion"
            required
            rows="3"
          ></textarea>
        </div>
        <div class="campo">
          <label>Stock inicial:</label>
          <input v-model.number="nuevoMaterial.stock" type="number" min="0" />
        </div>
        <button type="submit" class="btn-guardar">Guardar Material</button>
      </form>
    </div>

    <!-- Lista de materiales -->
    <div class="lista-materiales">
      <h2>Materiales Disponibles</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="material in materiales" :key="material.id">
            <td>{{ material.nombre }}</td>
            <td>{{ material.descripcion }}</td>
            <td class="stock" :class="{ bajo: material.stock < 20 }">
              {{ material.stock }}
            </td>
          </tr>
          <tr v-if="materiales.length === 0">
            <td colspan="3" class="empty">
              No hay materiales registrados aún.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.material-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.page-header h1 {
  margin: 0;
  color: #333;
}

.btn-agregar {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
}

.btn-agregar:hover {
  background-color: #34495e;
}

.mensaje {
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  margin-bottom: 20px;
}

.formulario {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.formulario h2 {
  margin-top: 0;
  color: #2c3e50;
}

.campo {
  margin-bottom: 15px;
}

.campo label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.campo input,
.campo textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-guardar {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-guardar:hover {
  background-color: #219a52;
}

.lista-materiales h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #3498db;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

.stock.bajo {
  color: #e74c3c;
  font-weight: bold;
}

.empty {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 30px;
}

/* Responsivo */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 6px;
    overflow: hidden;
  }

  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    content: attr(data-label);
    position: absolute;
    left: 15px;
    width: 45%;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "Nombre";
  }
  td:nth-of-type(2):before {
    content: "Descripción";
  }
  td:nth-of-type(3):before {
    content: "Stock";
  }
}
</style>
