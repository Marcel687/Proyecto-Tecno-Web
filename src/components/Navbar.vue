<script setup>
import { computed } from "vue";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const { isLoggedIn, getNombreUsuario, logout } = useAuth();
const router = useRouter();

const nombreUsuario = computed(() => getNombreUsuario());

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <nav id="navBar">
    <div class="container">
      <router-link to="/">
        <img src="/logoCBN_2.png" alt="Logo CBN" width="200" />
      </router-link>

      <ul>
        <li><router-link to="/">Inicio</router-link></li>

        <!-- Solo se muestra si está logueado -->
        <li v-if="isLoggedIn()">
          <router-link to="/locales">Locales</router-link>
        </li>

        <li v-if="isLoggedIn()">
          <router-link to="/material-promocional"
            >Material Promocional</router-link
          >
        </li>

        <li><router-link to="/contacto">Contáctanos</router-link></li>

        <li><router-link to="/comentario">Comentarios</router-link></li>

        <!-- Login / Usuario logueado -->
        <li>
          <template v-if="isLoggedIn()">
            <div class="user-menu">
              <span class="username">{{ nombreUsuario }}</span>
              <button @click="handleLogout" class="logout-btn">
                Cerrar sesión
              </button>
            </div>
          </template>
          <template v-else>
            <router-link to="/login">Log In</router-link>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
#navBar {
  width: 100%;
  height: 50px;
  background-color: gray;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
}

#navBar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  max-width: 100%;
}

#navBar .container a {
  display: block;
}

#navBar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

#navBar ul li {
  margin: 0;
}

#navBar ul li a {
  display: block;
  padding: 10px 20px;
  text-align: center;
  font-style: italic;
  text-decoration: none;
  color: black;
}

#navBar ul li a.actual {
  color: white;
  font-weight: bold;
}

#navBar ul li a:hover,
#navBar ul li a.current {
  color: white;
}

.user-area {
  position: relative;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: bold;
}

.username {
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background 0.3s;
}

.username:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: transparent;
  border: 1px solid #fff;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.logout-btn:hover {
  background: rgba(255, 0, 0, 0.3);
}

/* Ajuste para que los enlaces sigan viéndose bien */
#navBar ul li a.actual,
#navBar ul li a.current,
#navBar ul li a:hover {
  color: white;
}
</style>
