<script setup>
import { ref, reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

// === Estado del formulario ===
const form = reactive({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
})

const errores = reactive({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
})

const enviando = ref(false)
const mensajeEstado = ref('')
const mensajeClase = ref('')

// === Validación ===
const validarCampo = (campo) => {
  const valor = form[campo].trim()

  if (!valor) {
    errores[campo] = 'Este campo es obligatorio.'
    return false
  }

  if (campo === 'email' && !/^\S+@\S+\.\S+$/.test(valor)) {
    errores[campo] = 'Ingresa un email válido.'
    return false
  }

  if (campo === 'mensaje' && valor.length < 10) {
    errores[campo] = 'El mensaje debe tener al menos 10 caracteres.'
    return false
  }

  errores[campo] = ''
  return true
}

const validarFormulario = () => {
  return ['nombre', 'email', 'asunto', 'mensaje'].every(campo => validarCampo(campo))
}

// === Envío simulado ===
const enviarMensaje = () => {
  mensajeEstado.value = ''
  mensajeClase.value = ''

  if (!validarFormulario()) {
    mensajeEstado.value = 'Por favor, corrige los errores.'
    mensajeClase.value = 'error'
    return
  }

  enviando.value = true

  setTimeout(() => {
    console.log('Mensaje enviado:', { ...form })

    mensajeEstado.value = `¡Gracias, ${form.nombre}! Tu mensaje ha sido enviado.`
    mensajeClase.value = 'success'
    enviando.value = false

    // Limpiar formulario
    Object.keys(form).forEach(key => form[key] = '')
  }, 1500)
}
</script>
<!-- src/views/ContactoView.vue -->
<template>
  <div class="contacto-page">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido Principal -->
    <main>
      <section class="contact-container">
        <div class="contact-box">
          <h2>Contáctanos</h2>
          <p class="lead">
            ¿Tienes preguntas? Escríbenos y te responderemos lo antes posible.
          </p>

          <!-- Formulario -->
          <form @submit.prevent="enviarMensaje">
            <div class="input-group">
              <label for="nombre">Nombre</label>
              <input
                v-model="form.nombre"
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                required
                @blur="validarCampo('nombre')"
              />
              <span v-if="errores.nombre" class="error-text">{{ errores.nombre }}</span>
            </div>

            <div class="input-group">
              <label for="email">Correo electrónico</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                placeholder="nombre@ejemplo.com"
                required
                @blur="validarCampo('email')"
              />
              <span v-if="errores.email" class="error-text">{{ errores.email }}</span>
            </div>

            <div class="input-group">
              <label for="asunto">Asunto</label>
              <input
                v-model="form.asunto"
                type="text"
                id="asunto"
                placeholder="Tema del mensaje"
                required
                @blur="validarCampo('asunto')"
              />
              <span v-if="errores.asunto" class="error-text">{{ errores.asunto }}</span>
            </div>

            <div class="input-group">
              <label for="mensaje">Mensaje</label>
              <textarea
                v-model="form.mensaje"
                id="mensaje"
                rows="6"
                placeholder="Escribe tu mensaje aquí..."
                required
                @blur="validarCampo('mensaje')"
              ></textarea>
              <span v-if="errores.mensaje" class="error-text">{{ errores.mensaje }}</span>
            </div>

            <button type="submit" class="btn" :disabled="enviando">
              {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
            </button>

            <p v-if="mensajeEstado" :class="mensajeClase">
              {{ mensajeEstado }}
            </p>
          </form>
        </div>

        <!-- Información de contacto -->
        <aside class="contact-info">
          <h3>Información</h3>
          <p><strong>Teléfono:</strong> +591 75878037</p>
          <p><strong>Email:</strong> cerbezerianacional@cbn.bo</p>
          <p><strong>Dirección:</strong> La Paz, Bolivia</p>
        </aside>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>


<style scoped>
/* Reset básico */
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
  color: white;
}

/* Contenedor principal */
.contact-container {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  padding: 90px 20px 140px;
  min-height: calc(100vh - 200px);
}

/* Caja del formulario */
.contact-box {
  background-color: #222;
  padding: 30px;
  border-radius: 12px;
  width: 520px;
  box-shadow: 0 4px 20px rgba(255, 255, 0, 0.08);
}

.contact-box h2 {
  color: yellow;
  margin-top: 0;
}

.contact-box .lead {
  color: #ddd;
  margin-bottom: 20px;
}

/* Inputs */
.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  color: yellow;
  font-weight: bold;
  margin-bottom: 6px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #fff;
  outline: none;
}

.input-group input:focus,
.input-group textarea:focus {
  border: 2px solid yellow;
}

/* Botón */
.btn {
  width: 100%;
  background: yellow;
  color: black;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover:not(:disabled) {
  background: #fff;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Aside información */
.contact-info {
  width: 300px;
  background: #111;
  padding: 20px;
  border-radius: 12px;
  color: #ddd;
}

.contact-info h3 {
  color: yellow;
  margin-top: 0;
}

/* Mensajes de estado */
.success, .error {
  margin-top: 1rem;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}

.success {
  background: #28a745;
  color: white;
}

.error {
  background: #dc3545;
  color: white;
}

.error-text {
  color: #ff6666;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
}

/* Responsive */
@media (max-width: 900px) {
  .contact-container {
    flex-direction: column;
    align-items: center;
    padding: 80px 20px 160px;
  }
  .contact-info,
  .contact-box {
    width: 100%;
  }
}
</style>