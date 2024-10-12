<template>
  <button @click="sendOrder">Send Order</button>
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
  },
};
</script>
