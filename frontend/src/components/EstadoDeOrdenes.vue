<template>
    <div>
        <h4>Estados de Órdenes</h4>
        <v-data-table 
            :headers="headers"
            :items="orders"
            class="elevation-1">
        </v-data-table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EstadoDeOrdenes',
    data() {
        return {
            headers: [
                { title: 'Hora del Pedido', key: 'orderId', align: 'center' },
                { title: 'Numero de Orden', key: 'ID-ORDER', align: 'center' },
                { title: 'Nombre del Pedido', key: 'name', align: 'center' },
                { title: 'Estatus del Pedido', key: 'status', align: 'center' },
                { title: 'Detalle del Pedido', key: 'description', align: 'center' },
                { title: 'Tipo de Entrega', key: 'waiting', align: 'center' },
            ],
            orders: [],
        };
    },

    async created() {
        try {
            const response = await axios.post('http://localhost:3001/api/statusOrders');
            console.log({ response: response.data.orders })
            const orders = response.data.orders.map((x) => {
                let date = new Date(x.orderId);
                return {
                    orderId: date.toLocaleString('es-PE', {
                        timeZone: 'America/Lima',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    }),
                    'ID-ORDER': x['ID-ORDER'],
                    name: x.name,
                    status: x.status,
                    description: x.description,
                    waiting: x.waiting,
                }
            })
            console.log({ orders })

            this.orders = orders;
        } catch (error) {
            console.log(error)
            alert('Failed to consulted orders registration.');
        }
    }
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>