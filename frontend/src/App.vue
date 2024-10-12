<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to xd Your Vue.js App"/>
  <OrderButton msg=""/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import OrderButton from './components/OrderButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    OrderButton,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
