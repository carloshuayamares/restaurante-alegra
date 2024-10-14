<template>
    <div>
        <h2>Estados de Órdenes</h2>
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
                { text: 'IndiceTiempo', key: 'orderId' },
                { text: 'OrdendelPedido', key: 'ID-ORDER' },
                { text: 'NombredelPedido', key: 'name' },
                { text: 'EstatusdelPedido', key: 'status' },
            ],
            orders: [],
        };
    },

    async created() {
        try {
            const response = await axios.post('http://localhost:3001/api/statusOrders');
            console.log({ response: response.data.orders })
            const orders = response.data.orders.map((x) => {
                return {
                    orderId: x.orderId,
                    'ID-ORDER': x['ID-ORDER'],
                    name: x.name,
                    status: x.status,
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