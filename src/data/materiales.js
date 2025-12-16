let materiales = [
  {
    id: 1,
    nombre: "Cartel Afiches CBN",
    descripcion: "Carteles publicitarios tamaño A3 para puntos de venta",
    stock: 150
  },
  {
    id: 2,
    nombre: "Vasos Personalizados",
    descripcion: "Vasos de vidrio con logo CBN, capacidad 350ml",
    stock: 80
  },
  {
    id: 3,
    nombre: "Camisetas Promocionales",
    descripcion: "Camisetas polo negras con logo bordado",
    stock: 45
  },
  {
    id: 4,
    nombre: "Portavasos",
    descripcion: "Set de 100 portavasos de cartón reciclado",
    stock: 300
  }
];

let historialAsignaciones = [];

// Funciones para manipular los datos (simulan una base de datos en memoria)
export const getMateriales = () => {
  return materiales;
};

export const asignarMaterial = (materialId, cantidad, localNombre) => {
  const material = materiales.find(m => m.id === materialId);
  if (!material) return { success: false, message: "Material no encontrado" };

  if (cantidad <= 0) return { success: false, message: "La cantidad debe ser mayor a 0" };
  if (material.stock < cantidad) return { success: false, message: `Stock insuficiente. Disponible: ${material.stock}` };

  material.stock -= cantidad;

  // Guardar en historial
  historialAsignaciones.push({
    id: Date.now(),
    materialId,
    materialNombre: material.nombre,
    cantidad,
    local: localNombre,
    fecha: new Date().toLocaleDateString("es-BO")
  });

  return { success: true, message: `Asignados ${cantidad} de ${material.nombre}` };
};

export const getHistorialPorLocal = (localNombre) => {
  return historialAsignaciones.filter(h => h.local === localNombre);
};

export const agregarMaterial = (nuevoMaterial) => {
  const nuevoId = Math.max(...materiales.map(m => m.id), 0) + 1;
  const material = {
    id: nuevoId,
    nombre: nuevoMaterial.nombre.trim(),
    descripcion: nuevoMaterial.descripcion.trim(),
    stock: parseInt(nuevoMaterial.stock) || 0
  };
  materiales.push(material);
  return material;
};

export const actualizarStock = (id, nuevoStock) => {
  const material = materiales.find(m => m.id === id);
  if (material) {
    material.stock = parseInt(nuevoStock) || 0;
  }
  return material;
};