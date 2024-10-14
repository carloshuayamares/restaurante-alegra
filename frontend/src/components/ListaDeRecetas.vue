<template>
    <div>
        <h2>Recetas</h2>
        <ul>
            <li v-for="receta in recetas" :key="receta.id">
                {{ receta.nombre }}
                <ul>
                    <li v-for="ingrediente in receta.ingredientes" :key="ingrediente.nombre">
                        {{ ingrediente.nombre }} - {{ ingrediente.cantidad }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recetas: []
        };
    },
    async created() {
        const response = await fetch('http://localhost:3000/recetas');
        this.recetas = await response.json();
    }
};
</script>