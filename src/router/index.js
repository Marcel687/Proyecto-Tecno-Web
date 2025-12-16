import { createRouter, createWebHistory } from "vue-router";

import Principal from "../views/Principal.vue";
import Login from "../views/Login.vue";
import Locales from "../views/Locales.vue";
import Contacto from "../views/Contacto.vue";
import MaterialPromocional from "../views/MaterialPromocional.vue";
import Comentario from "../views/Comentario.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "principal",
      component: Principal,
    },
    {
      path: "/Login",
      name: "login",
      component: Login,
    },
    {
      path: "/Locales",
      name: "locales",
      component: Locales,
    },
    {
      path: "/Contacto",
      name: "contacto",
      component: Contacto,
    },
    {
      path: "/material-promocional",
      name: "material-promocional",
      component: MaterialPromocional,
    },
    {
      path: "/Comentario",
      name: "comentario",
      component: Comentario,
    },
  ],
});

export default router;
