const axios = require('axios');

const tableName = process.env.DY_TABLE_ORDERS

const reInventoryController = async (messageBody) => {
    try {
        const response = await axios.post('http://inventory-service:3003/api/request-ingredients', {...messageBody});
        if (response.data.success) {
            // actualizamos la tabla de ordenes
            await axios.post('http://inventory-service:3003/api/retry-market',
                {
                    tableName,
                    orderId: messageBody.orderId,
                    SK: messageBody.recipe['ID-RECIPE'],
                    nuevosDatos: {
                        nuevoEstado: 'Listo', // status cambiar
                        nuevaDescripcion: 'Gracias por su espera.',
                    }
                }
             );
            console.log({a: 'actualizamos la tabla de ordenes', responseSQS: response.data.market})
        }
        return response
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

module.exports = {
    reInventoryController,
}
