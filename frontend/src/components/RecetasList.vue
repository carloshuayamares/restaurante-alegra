<template>
    <div>
      <v-list>
        <v-list-item
          v-for="(recipe, index) in recipes"
          :key="index"
          @click="selectRecipe(recipe)"
        >
          <v-list-item-content>
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
  