<template>
    <div>
      <v-list>
        <v-list-item
          v-for="(ingredient, index) in ingredients"
          :key="index"
          @click="selectIngredient(ingredient)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
            <v-list-item-subtitle>Cantidad: {{ ingredient.quantity }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ingredients: Array
    },
    methods: {
      selectIngredient(ingredient) {
        this.$emit('ingredient-selected', ingredient);
      }
    }
  };
  </script>
  