<template>
    <div>
        <h2>Estados de Órdenes</h2>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Tabla de Ejemplo</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                    </v-toolbar>
                </template>


            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EstadoDeOrdenes',
    data() {
        return {
            headers: [
                { text: 'Indice Tiempo', value: 'orderId' },
                { text: 'OrdendelPedido', value: 'ID-ORDER' },
                { text: 'Nombre del Pedido', value: 'name' },
                { text: 'Estatus del Pedido', value: 'status' },
            ],
            items: [],
        };
    },
    methods: {
        editItem(item) {
        console.log("Editar: ", item);
        },
        deleteItem(item) {
        console.log("Eliminar: ", item);
        }
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

            this.items = orders;
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