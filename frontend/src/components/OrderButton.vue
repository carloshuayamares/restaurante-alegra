<template>
  <h4>Generar un tipo de orden:</h4>

  <v-container>
    <v-btn color="primary" class="ma-2" elevation="10" rounded @click="sendOrder">
      <v-icon left>mdi-basket-plus</v-icon>
       Unica Orden
    </v-btn>

    <!-- Otro ejemplo con botón con borde -->
    <v-btn color="secondary" outlined class="ma-2" elevation="5" rounded @click="openDialog">
      <v-icon right>mdi-star</v-icon>
       Orden Masiva:
    </v-btn>

    <!-- Modal (v-dialog) -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Ingresa la cantidad de ordenes a solicitar:</v-card-title>

        <v-card-text>
          <v-text-field v-model="inputParam" label="Cantidad de Ordenes" placeholder="Introduce un valor"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="submitParam">Ordenar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mostrar el valor ingresado -->
    <div v-if="submittedParam">
      <p>Última solicitud masiva de: {{ submittedParam }} Ordenes.</p>
    </div>
  </v-container>

  <br><hr><br>
  <h4>Reiniciar el servicio:</h4>
  <v-container>

    <!-- Otro ejemplo con botón con borde -->
    <v-btn color="dark" outlined class="ma-2" elevation="2" rounded @click="openDialog">
      <v-icon right>mdi-alert</v-icon>
      Reinciar el Servicio.
    </v-btn>

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
        if (isNaN(this.submittedParam)) alert('Ingrese un número entero. Muchas Gracias.');
        else if (parseFloat(this.submittedParam) >= 20) alert('Su pedido no puede exceder 20 ordenes. Muchas Gracias.');
        else if (!Number.isInteger(parseFloat(this.submittedParam))) alert('Ingrese un número entero. Muchas Gracias.');
        else {
          axios.post('http://localhost:3001/api/order', { cantidad: this.submittedParam });
          // console.log({ pedido })
          this.closeDialog();   // Cierra el modal después de guardar
          alert('Su pedido se esta procesando con exito!');
        }
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    },
    async sendOrder() {
      try {
        axios.post('http://localhost:3001/api/order', { cantidad: 1 });
        alert('Order sent successfully!');
      } catch (error) {
        console.log(error)
        alert('Failed to send order.');
      }
    },
  },
};
</script>
