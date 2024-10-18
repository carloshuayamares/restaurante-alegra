<template>

    <v-container>
        <v-row>
            <v-col cols="4">
                <div><h4>Recetas</h4></div>
                <RecipeList :recipes="recipes" @recipe-selected="handleRecipeSelected" />
            </v-col>
            <v-col cols="8">
                <RecipeDetail :selectedRecipe="selectedRecipe" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import RecipeList from './RecetasList.vue';
import RecipeDetail from './RecetasDetail.vue';
import axios from 'axios';

export default {
    components: {
        RecipeList,
        RecipeDetail
    },
    data() {
        return {
            recipes: [],
            selectedRecipe: null
        };
    },
    async created() {
        try {
            const response = await axios.post('http://localhost:3001/api/recipes');
            console.log({ response, b: response.data.recipes })
            this.recipes = response.data.recipes;
        } catch (error) {
            console.log(error)
            alert('Failed to consulted recipes.');
        }
    },
    methods: {
        handleRecipeSelected(recipe) {
            this.selectedRecipe = recipe;
        }
    }
};
</script>