// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import OrderButton from '../components/OrderButton.vue';
import ListaDeRecetas from '../components/ListaDeRecetas.vue';
import EstadoDeOrdenes from '../components/EstadoDeOrdenes.vue';
import IngredientesDisponibles from '../components/IngredientesDisponibles.vue';
// import HacerPedido from '../components/HacerPedido.vue';

const routes = [
    { path: '/', component: OrderButton },
    { path: '/recetas', component: ListaDeRecetas },
    { path: '/ordenes', component: EstadoDeOrdenes },
    { path: '/ingredientes', component: IngredientesDisponibles },
    // { path: '/pedir-plato', component: HacerPedido },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
