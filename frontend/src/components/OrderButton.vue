<template>
  <h4>Generar un tipo de orden:</h4>

  <v-container>
    <v-btn color="primary" class="ma-2" elevation="10" rounded @click="sendOrder">
      <v-icon left>mdi-basket-plus</v-icon>
      Generar Orden
    </v-btn>

    <!-- Otro ejemplo con botón con borde -->
    <v-btn color="secondary" outlined class="ma-2" elevation="5" rounded @click="openDialog">
      <v-icon right>mdi-star</v-icon>
      Orden Masiva:
    </v-btn>

    <!-- Modal (v-dialog) -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Ingresa un parámetro</v-card-title>

        <v-card-text>
          <v-text-field v-model="inputParam" label="Parámetro" placeholder="Introduce un valor"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="submitParam">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mostrar el valor ingresado -->
    <div v-if="submittedParam">
      <p>Parámetro ingresado: {{ submittedParam }}</p>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,       // Controla la visibilidad del modal
      inputParam: '',      // Valor del input dentro del modal
      submittedParam: ''   // Almacena el valor enviado
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;  // Abre el modal
    },
    closeDialog() {
      this.dialog = false; // Cierra el modal
      this.inputParam = ''; // Limpia el campo de input
    },
    async submitParam() {
      this.submittedParam = this.inputParam; // Guarda el valor ingresado

      console.log(this.submittedParam, typeof this.submittedParam)
      try {
        const pedido = await axios.post('http://localhost:3001/api/order', { cantidad: this.submittedParam });
        console.log({ pedido })
        this.closeDialog();   // Cierra el modal después de guardar
        alert('Order sent successfully!');
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    },
    async sendOrder() {
      try {
        const pedido = await axios.post('http://localhost:3001/api/order', { cantidad: 1 });
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
