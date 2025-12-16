<script setup>
defineProps({ locales: Array });
defineEmits(["ver-local"]);

const formatDate = (date) => new Date(date).toLocaleDateString("es-BO");
</script>

<template>
  <div class="tabla-responsive">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ubicación</th>
          <th>Propietario</th>
          <th>NIT</th>
          <th>Fecha de Registro</th>
          <th>Revisar</th>
          <th>Asignar Material</th> <!-- NUEVA COLUMNA -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(local, index) in locales" :key="index">
          <td>{{ local.nombre }}</td>
          <td>{{ local.Ubicacion }}</td>
          <td>{{ local.Propietario }}</td>
          <td>{{ local.nit }}</td>
          <td>{{ formatDate(local.Fecha) }}</td>
          <td>
            <button class="btn-ver" @click="$emit('ver-local', local, 'detalle')">
              <img src="/revisar.png" alt="Revisar" class="imagen-revisar" />
            </button>
          </td>
          <td>
            <button class="btn-asignar" @click="$emit('ver-local', local, 'asignar')">
              <img src="/asignar.png" alt="Asignar Material" class="imagen-revisar" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  background: #003366;
  color: white;
}

th,
td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background: #f0f4ff;
  transition: background 0.3s;
}

th {
  text-transform: uppercase;
  font-size: 0.9rem;
}

td {
  color: #333;
}

.imagen-revisar {
  height: 20px;
  display: block;
  margin: 0 auto;
}

.btn-ver {
  background-color: #216db9;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-ver:hover {
  background-color: #ffcc00;
}

.btn-asignar {
  background-color: #27ae60;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-asignar:hover {
  background-color: #2ecc71;
}
</style>
