<template>
  <div>
    <h4>Ingredientes</h4>
  </div>
  <v-container>
    <v-row>
      <v-col cols="4">
        <IngredientList :ingredients="ingredients" @ingredient-selected="handleIngredientSelected" />
      </v-col>
      <v-col cols="8">
        <IngredientHistory :selectedIngredient="selectedIngredient" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

import IngredientList from './IngredientList.vue';
import IngredientHistory from './IngredientHistory.vue';

export default {
  components: {
    IngredientList,
    IngredientHistory
  },
  data() {
    return {
      ingredients: [
        // { id: 1, name: 'Tomato', quantity: 5 },
        // { id: 2, name: 'Lemon', quantity: 5 },
        // { id: 3, name: 'Potato', quantity: 5 },
        // { id: 4, name: 'Rice', quantity: 5 },
        // { id: 5, name: 'Ketchup', quantity: 5 },
        // { id: 6, name: 'Lettuce', quantity: 5 },
        // { id: 7, name: 'Onion', quantity: 5 },
        // { id: 8, name: 'Cheese', quantity: 5 },
        // { id: 9, name: 'Meat', quantity: 5 },
        // { id: 10, name: 'Chicken', quantity: 5 }
      ],
      selectedIngredient: null
    };
  },
  async created() {
    try {
      const response = await axios.post('http://localhost:3003/api/ingredients-count');
      console.log({ ingredientsCount: response.data.ingredients })
      this.ingredients = response.data.ingredients;
    } catch (error) {
      console.log(error)
      alert('Failed to consulted recipes.');
    }
  },
  methods: {
    handleIngredientSelected(ingredient) {
      this.selectedIngredient = ingredient;
    }
  }
};
</script>