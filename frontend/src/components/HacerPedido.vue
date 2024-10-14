<template>
    <div>
        <button @click="hacerPedido">Pedir Platos</button>
    </div>
</template>

<script>
export default {
    methods: {
        async hacerPedido() {
            const response = await fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    platos: [
                        { nombre: 'Plato 1', cantidad: 5 },
                        { nombre: 'Plato 2', cantidad: 10 }
                    ]
                })
            });
            const data = await response.json();
            console.log(data);
        }
    }
};
</script>