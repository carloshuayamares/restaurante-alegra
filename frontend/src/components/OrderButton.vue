<template>
  <button @click="sendOrder">Send Order</button>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async sendOrder() {
      try {
        await axios.post('http://localhost:3001/api/order');
        alert('Order sent successfully!');
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    },
  },
};
</script>
