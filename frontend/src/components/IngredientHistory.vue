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
export default {
  props: {
    selectedIngredient: Object
  },
  data() {
    return {
      headers: [
        { text: 'Fecha', value: 'date' },
        { text: 'Tipo', value: 'type' }, // Compra o Uso
        { text: 'Cantidad', value: 'quantity' }
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
    fetchPurchaseHistory() { // ingredientId
      // Aquí harías la llamada al backend para obtener el historial de compras y uso
      // Simulando los datos
      this.purchaseHistory = [
        { date: '2024-10-01', type: 'Compra', quantity: 5 },
        { date: '2024-10-05', type: 'Uso', quantity: 1 },
        { date: '2024-10-07', type: 'Compra', quantity: 3 },
        { date: '2024-10-10', type: 'Uso', quantity: 1 }
      ];
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