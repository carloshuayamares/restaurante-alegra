<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(recipe, index) in recipes"
        :key="index"
        @click="selectRecipe(recipe)"
        :class="{'selected-item': selected === index}"
      >
        <v-list-item-content>
          <v-list-item-title>ID Receta: {{ recipe['ID-RECIPE'] }}</v-list-item-title>
          <v-list-item-title>{{ recipe.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    recipes: Array
  },
  methods: {
    selectRecipe(recipe) {
      this.$emit('recipe-selected', recipe);
    }
  }
};
</script>

<style scoped>
/* Agrega un borde a todos los v-list-item-content */
.v-list-item-content {
  border: 1px solid #ccc; /* Borde gris claro */
  padding: 8px;
}

/* Clase que se aplica cuando el ítem está seleccionado */
.selected-item {
  border: 2px solid blue; /* Borde más grueso y de color azul */
  background-color: rgba(0, 0, 255, 0.1); /* Fondo azul claro */
}
</style>