<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Productos from "@/components/Productos.vue";
import PrecioPopup from "@/components/PrecioPopup.vue";
import AdvertenciaPopup from "@/components/AdvertenciaPopup.vue";

// === Datos importados ===
import { productos } from "@/data/productos";
</script>

<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Mensaje de Introducción -->
    <div id="MensajeInicio">
      <div class="container">
        <div class="showcase-content">
          <iframe
            class="video-fondo"
            src="https://www.youtube.com/embed/vE_Hegex0j0?mute=0&loop=1&playlist=vE_Hegex0j0&controls=0&modestbranding=1"
            title="Video de Cervecería"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- <router-link to="/acerca" class="btn">Acerca de nosotros</router-link> -->
          <h3>
            Somos un equipo dinámico y apasionado por lo que hace. Nuestras
            ganas de asumir nuevos desafíos, de divertirnos y de aprender
            constantemente nos llevan a conformar una de las mejores compañías
            para trabajar en el país.
          </h3>
        </div>
      </div>
    </div>

    <!-- Productos -->
    <div id="productos">
      <Productos :listaProductos="productos" />
    </div>

    <!-- Popups -->
    <PrecioPopup />
    <AdvertenciaPopup />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* Mensaje Inicio: responsive showcase */
#MensajeInicio .showcase-content {
  position: relative; /* contexto para posicionamiento absoluto */
  width: 100%;
  /* en pantallas grandes ocupar pantalla completa, en móviles reducir altura */
  height: clamp(50vh, 100vh, 100vh);
  min-height: 380px;
  overflow: hidden;
  display: block;
}

#MensajeInicio .showcase-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* overlay para mejorar legibilidad del texto sobre la imagen */
#MensajeInicio .showcase-content::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.6) 75%
  );
  pointer-events: none;
}

#MensajeInicio .showcase-content h3,
#MensajeInicio .showcase-content .btn {
  position: absolute; /* coloca el texto sobre la imagen */
  z-index: 2; /* por encima del overlay */
  color: yellow;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  width: min(92%, 1100px);
}

/* texto principal: responsive con clamp */
#MensajeInicio .showcase-content h3 {
  bottom: clamp(20px, 6vh, 60px); /* posición adaptable */
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  line-height: 1.3;
  padding: 0 16px;
}

#MensajeInicio .showcase-content .btn {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centra el botón */
  background-color: rgba(0, 0, 0, 0.6);
  color: yellow;
  padding: clamp(8px, 1.8vw, 12px) clamp(12px, 3vw, 20px);
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  z-index: 2;
}

#MensajeInicio .showcase-content .btn:hover {
  color: white;
}

/* Ajustes para pantallas pequeñas: texto más grande relativo y más centrado */
@media (max-width: 600px) {
  #MensajeInicio .showcase-content {
    height: clamp(45vh, 60vh, 70vh);
    min-height: 320px;
  }
  #MensajeInicio .showcase-content h3 {
    font-size: clamp(1rem, 3.2vw, 1.25rem);
    bottom: 24px;
    padding: 0 12px;
  }
  #MensajeInicio .showcase-content .btn {
    top: auto;
    bottom: 16px;
    transform: translateX(-50%);
  }
}

/* Ajustes para pantallas muy grandes: aumentar un poco la separación */
@media (min-width: 1400px) {
  #MensajeInicio .showcase-content h3 {
    font-size: 2rem;
    bottom: 80px;
  }
}

.video-fondo {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  z-index: 0;
  border: none;
}
</style>
