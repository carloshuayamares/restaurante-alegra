<template>
    <div v-if="selectedRecipe">
        <!-- Cuando hay receta seleccionada, se muestran los ingredientes -->
        <h3>Ingredientes de {{ selectedRecipe.name }}</h3>
        <v-data-table :headers="headers" :items="selectedRecipe.ingredients" class="elevation-1"></v-data-table>
    </div>

    <div v-else class="placeholder-container">
        <!-- Cuando no hay receta seleccionada, se muestra el placeholder -->
        <div class="placeholder-content">
            <img src="@/assets/placeholder.png" class="placeholder-image" />
            <p class="placeholder-text">Selecciona una receta para ver los ingredientes.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedRecipe: Object
    },
    data() {
        return {
            headers: [
                { text: 'Ingrediente', value: 'name' },
                { text: 'Cantidad', value: 'qty' }
            ]
        };
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