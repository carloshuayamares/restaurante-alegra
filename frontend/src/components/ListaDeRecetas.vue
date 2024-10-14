<template>
    <div>
        <h2>Recetas</h2>
        <ul>
            <li v-for="receta in recetas" :key="receta.name">
                {{ receta.name }}
                <ul>
                    <li v-for="ingrediente in receta.ingredients" :key="ingrediente.name">
                        {{ ingrediente.name }} - {{ ingrediente.qty }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            recetas: []
        };
    },
    async created() {
        try {
            const response = await axios.post('http://localhost:3001/api/recipes');
            console.log({ response, b: response.data.recipes })
            this.recetas = response.data.recipes;
        } catch (error) {
            console.log(error)
            alert('Failed to consulted recipes.');
        }
    }
};
</script>