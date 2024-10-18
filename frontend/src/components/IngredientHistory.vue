<template>
  <div v-if="selectedIngredient">
    <h3>Historial de {{ selectedIngredient.name }}</h3>
    <v-data-table :headers="headers" :items="purchaseHistory" class="elevation-1"></v-data-table>
  </div>

  <div v-else class="placeholder-container">
    <!-- Cuando no hay receta seleccionada, se muestra el placeholder -->
    <div class="placeholder-content">
      <img src="@/assets/placeholder.png" class="placeholder-image" />
      <p class="placeholder-text">Selecciona un ingrediente para ver su historico.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    selectedIngredient: Object
  },
  data() {
    return {
      headers: [
        { title: 'Fecha', key: 'date' },
        { title: 'N° Orden', key: 'order' },
        { title: 'Tipo', key: 'type' },
        { title: 'Cantidad', key: 'quantity' }
      ],
      purchaseHistory: []
    };
  },
  watch: {
    selectedIngredient(newIngredient) {
      if (newIngredient) {
        this.fetchPurchaseHistory(newIngredient.id);
      }
    }
  },
  methods: {
    async fetchPurchaseHistory(ingredientId) { // ingredientId
      // Aquí harías la llamada al backend para obtener el historial de compras y uso
      try {
        const response = await axios.post('http://localhost:3003/api/ingredients-history', { ingredientId });
        console.log({ purchaseHistory: response.data.purchaseHistory, ingredientId })
        this.purchaseHistory = response.data.purchaseHistory;
      } catch (error) {
        console.log(error)
        alert('Failed to consulted recipes.');
      }

    }
  }
};
</script>

<style scoped>
.placeholder-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Ocupa todo el espacio disponible */
  text-align: center;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.placeholder-image {
  width: 200px;
  opacity: 0.5;
  /* Hacer la imagen translúcida */
}

.placeholder-text {
  font-size: 1.2em;
  color: rgba(0, 0, 0, 0.5);
  /* Texto translúcido */
}
</style>