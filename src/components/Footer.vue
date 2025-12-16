<template>
  <footer id="pie_pagina">
    <div class="Derechos">
      <p>@Derechos reservados a grupo Omicron</p>
      <ul>
        <span>Miembros:</span>
        <li>Luis Zelaya</li>
        <li>Marcel Murillo</li>
        <li>Ricardo Camacho</li>
      </ul>
    </div>
    <router-link to="/">
      <img src="/logoCBN_2.png" alt="Logo CBN" />
    </router-link>
  </footer>
</template>

<style scoped>
/* Footer responsive: usa flex-wrap y unidades responsive (clamp) para tamaños */
#pie_pagina {
  width: 100%;
  background-color: gray;
  /* position: fixed; */
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(8px, 2vw, 24px);
  color: black;
  z-index: 3; /* asegúrate de que esté por encima de todo */
  box-sizing: border-box;
  flex-wrap: wrap; /* permite que los elementos se muevan en varias líneas */
  gap: 12px;
}

/* Por defecto en pantallas pequeñas, apilar contenido verticalmente */
#pie_pagina .Derechos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

#pie_pagina .Derechos p {
  margin: 0;
  /* aumentamos un poco las letras manteniendo responsividad */
  font-size: clamp(0.8rem, 1.6vw, 1.1rem);
  font-weight: bold;
}

#pie_pagina .Derechos ul {
  margin: 0;
  padding-left: 1rem;
  /* texto de la lista ligeramente mayor */
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  list-style-type: square;
}

#pie_pagina .Derechos ul span {
  font-weight: bold;
  display: block;
  margin-bottom: 3px;
}

#pie_pagina img {
  max-width: 160px;
  height: auto;
  margin-left: 20px;
  border-radius: 5px;
  object-fit: contain; /* evita que se deforme */
}

/* Tablet / Desktop: mostrar en una sola línea y ajustar tamaños */
@media (min-width: 768px) {
  #pie_pagina .Derechos {
    flex-direction: row;
    align-items: center;
  }
  #pie_pagina .Derechos p {
    margin-right: 12px;
  }
  #pie_pagina img {
    max-width: 200px;
  }
}

/* Pequeñas pantallas móviles: centrar y reducir márgenes */
@media (max-width: 480px) {
  #pie_pagina {
    padding: 10px;
    justify-content: center;
    text-align: center;
  }
  #pie_pagina .Derechos {
    width: 100%;
    align-items: center;
  }
  #pie_pagina img {
    margin: 0;
    max-width: 120px;
  }
  #pie_pagina .Derechos ul {
    padding-left: 0;
  }
}
</style>
