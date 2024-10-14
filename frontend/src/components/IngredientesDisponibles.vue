<template>
    <div>
        <h2>Ingredientes Disponibles</h2>
        <ul>
            <li v-for="ingrediente in ingredientes" :key="ingrediente.id">
                {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} disponibles
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ingredientes: []
        };
    },
    async created() {
        const response = await fetch('http://localhost:3000/ingredientes');
        this.ingredientes = await response.json();
    }
};
</script>