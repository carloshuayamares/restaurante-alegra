<template>
  <h4>Generar un tipo de orden:</h4>

  <v-container>
    <v-btn
      color="primary"
      class="ma-2"
      elevation="10"
      rounded
      @click="sendOrder"
    >
      <v-icon left>mdi-basket-plus</v-icon>
      Generar Orden
    </v-btn>

    <!-- Otro ejemplo con botón con borde -->
    <v-btn
      color="secondary"
      outlined
      class="ma-2"
      elevation="5"
      rounded
      @click="onClick"
    >
      <v-icon right>mdi-star</v-icon>
      Orden Masiva:
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async sendOrder() {
      try {
        const pedido = await axios.post('http://localhost:3001/api/order');
        console.log({ pedido })
        alert('Order sent successfully!');
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    },
    async onClick() {
      try {
        const pedido = await axios.post('http://localhost:3001/api/order', { cantidad: 3 });
        console.log({ pedido })
        alert('Order sent successfully!');
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    }
  },
};
</script>
