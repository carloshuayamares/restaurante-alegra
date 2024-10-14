<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Boton de Ordenar</router-link></li>
          <li><router-link to="/recetas">Recetas</router-link></li>
          <!-- <li><router-link to="/pedir-plato">Pedir Plato</router-link></li> -->
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
header {
  background-color: #42b983;
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
