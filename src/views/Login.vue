<script setup>
import { ref, reactive } from "vue"; //importa una variable reactiva y un objeto o array reactivo
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

import { useAuth } from "@/stores/auth";
const { login } = useAuth();

const router = useRouter();

// === Estado del formulario ===
const form = reactive({
  //crea un objeto reactivo
  usuario: "", // empiezan vacias
  password: "",
});

const mensaje = ref("");
const error = ref(false);
const success = ref(false);
const loading = ref(false);

// === Validación en tiempo real ===
const validateFields = () => {
  if (!form.usuario || !form.password) {
    //si los campos estan vacios
    showMessage("Por favor, complete todos los campos.", true); //mensaje de error
    return false;
  }
  return true;
};

// === Mostrar mensaje ===
const showMessage = (text, isError = false, isSuccess = false) => {
  //recibe el mensaje, indica si el mensaje es de error o de exito
  mensaje.value = text; //Asigna el texto recibido a la variable reactiva mensaje
  error.value = isError; //Asigna true o false a la variable reactiva error según el parámetro isError
  success.value = isSuccess; //Asigna true o false a la variable reactiva success según el parámetro isSuccess
};

// === Login exitoso ===
const loginExitoso = (nombre) => {
  showMessage(`Inicio de sesión exitoso (${nombre})`, false, true);
  loading.value = true;
  login(nombre); // ← Ahora sí afecta a toda la app
  setTimeout(() => router.push({ name: "principal" }), 1500);
};

// === Mostrar error ===
const mostrarError = () => {
  showMessage("Contraseña incorrecta", true); //mensaje de error
};

// === Manejo del login ===
const handleLogin = () => {
  // Limpiar mensaje anterior
  mensaje.value = "";
  error.value = false;
  success.value = false;
  loading.value = false;

  // Validar campos vacíos
  if (!validateFields()) return; //si el usuario y la contraseña no están vacíos.

  const usuario = form.usuario.trim().toLowerCase(); //quita los espacios de inicio y final y convierte todo a minusculas

  // Validación con switch
  switch (usuario) {
    case "ricardo":
      if (form.password === "1234") {
        loginExitoso("Ricardo");
      } else {
        mostrarError();
      }
      break;

    case "marcel":
      if (form.password === "5678") {
        loginExitoso("Marcel");
      } else {
        mostrarError();
      }
      break;

    case "luis":
      if (form.password === "0000") {
        loginExitoso("Luis");
      } else {
        mostrarError();
      }
      break;

    default:
      showMessage("Usuario no encontrado", true);
  }
};
</script>

<template>
  <div class="login-page">
    <!-- Barra de Navegación -->
    <Navbar />

    <!-- Formulario de Login -->
    <main>
      <section class="login-container">
        <div class="login-box">
          <h2>Iniciar Sesión</h2>
          <form @submit.prevent="handleLogin">
            <!--Llama a la función handleLogin cuando se hace clic en el botón “Entrar” o se presiona Enter y prevent evita que el formulario haga recarga de página-->
            <div class="input-group">
              <label for="usuario">Usuario</label>
              <input
                v-model="form.usuario"
                type="text"
                id="usuario"
                placeholder="Ingrese su usuario"
                required
                @blur="validateFields"
              />
              <!--enlaza el input con form.usuario, obliga a rellenar el campo y cuando el usuario sale del input (pierde foco), se valida que no esté vacío.-->
            </div>

            <div class="input-group">
              <label for="password">Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required
                @blur="validateFields"
              />
            </div>

            <button type="submit" class="btn" :disabled="loading">
              <!--desactiva el botón mientras loading sea true-->
              {{ loading ? "Entrando..." : "Entrar" }}
              <!--muestra “Entrando...” si loading es true, sino “Entrar”.-->
            </button>

            <p :class="{ error: error, success: success }" id="mensaje-error">
              <!--es un objeto de clases condicionales:-->
              {{ mensaje }}
              <!--Muestra el contenido de la variable reactiva mensaje-->
            </p>
          </form>
        </div>
      </section>
    </main>

    <!-- Pie de Página -->
    <Footer />
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #111, #000);
}

/* Caja del Formulario */
.login-box {
  background-color: #222;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(255, 255, 0, 0.3);
  text-align: center;
  width: 350px;
}

/* Título */
.login-box h2 {
  color: yellow;
  margin-bottom: 30px;
}

/* Grupo de Input: Contiene label e input */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

/* Label */
.input-group label {
  display: block;
  font-weight: bold;
  color: yellow;
  margin-bottom: 5px;
}

/* Input */
.input-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #333;
  color: white;
  outline: none;
}

/* Efecto focus en el input */
.input-group input:focus {
  border: 2px solid yellow;
}

/* Botón 'Ingresar' */
.btn {
  background-color: yellow;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  transition: 0.3s;
}

/* Efecto hover en el botón */
.btn:hover {
  background-color: white;
  color: black;
}

/* Mensaje de Error (usando ID en tu CSS original) */
#mensaje-error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 10px; /* Añadido margen inferior para separarlo del botón */
}
</style>
