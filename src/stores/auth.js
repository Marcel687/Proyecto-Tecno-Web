import { ref } from "vue";

// Creamos el estado GLOBAL una sola vez (fuera de cualquier función)
const usuarioLogueado = ref(null); //valor inicia null porque nadie esta logeado

// Función que siempre devuelve la misma instancia
export const useAuth = () => {
  const login = (nombre) => {
    usuarioLogueado.value = nombre;
  };

  const logout = () => {
    usuarioLogueado.value = null;
  };

  const isLoggedIn = () => !!usuarioLogueado.value;

  const getNombreUsuario = () => usuarioLogueado.value;

  return {
    usuarioLogueado, // opcional: para debugging
    login,
    logout,
    isLoggedIn,
    getNombreUsuario,
  };
};

if (localStorage.getItem("usuarioLogueado")) {
  usuarioLogueado.value = localStorage.getItem("usuarioLogueado");
}

// Guardar cada vez que cambie
import { watch } from "vue";
watch(usuarioLogueado, (nuevo) => {
  if (nuevo) {
    localStorage.setItem("usuarioLogueado", nuevo);
  } else {
    localStorage.removeItem("usuarioLogueado");
  }
});
