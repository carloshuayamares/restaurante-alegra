<template>
    <div>
        <h2>Estados de Órdenes</h2>
        <ul>
            <li v-for="orden in ordenes" :key="orden.id">
                {{ orden.nombre }} - {{ orden.estado }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ordenes: []
        };
    },
    async created() {
        const response = await fetch('http://localhost:3000/ordenes');
        this.ordenes = await response.json();
    }
};
</script>