<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/recetas">Recetas</router-link></li>
          <li><router-link to="/ordenes">Estado de Órdenes</router-link></li>
          <li><router-link to="/ingredientes">Ingredientes</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <!-- Aquí se mostrarán los componentes según la ruta -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

/* Estilo personalizado para la pestaña activa */
.router-link-active {
  font-weight: bold;
  color: #000000;  /* Cambia este color al que prefieras */
  border-bottom: 2px solid #ffffff;
}

header {
  background-color: #00b19c;
  padding: 1rem;
  color: white;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d3032;
  margin-top: 60px;
}
</style>
