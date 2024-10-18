const { selectElementsTableDY } = require('../utils/AWS')

// Inventario inicial
let inventory = {
    tomato: { qty: 5, id: 1 },
    lemon: { qty: 5, id: 2 },
    potato: { qty: 5, id: 3 },
    rice: { qty: 5, id: 4 },
    ketchup: { qty: 5, id: 5 },
    lettuce: { qty: 5, id: 6 },
    onion: { qty: 5, id: 7 },
    cheese: { qty: 5, id: 8 },
    meat: { qty: 5, id: 9 },
    chicken: { qty: 5, id: 10 },
};

const timeCreation = new Date(1729233614074)

// Convertir a una cadena legible en la zona horaria de Perú (GMT-5)
let options = {
    timeZone: 'America/Lima',           // Zona horaria de Perú
    year: 'numeric',
    month: 'numeric',                      // Muestra el nombre completo del mes
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false                       // 24 horas
  };

module.exports = async (req, res, next) => {

    const tableName = process.env.DY_MARKET_REQUEST;
    const { ingredientId } = req.body

    const inventarioInicial = [
        {
            date: timeCreation.toLocaleString('es-PE', options),
            order: '-',
            type: 'Apertura',
            quantity: 5,
        }
    ]

    try {
        const ingredientName = Object.keys(inventory).find((x) => inventory[x].id === ingredientId)
        console.log({ingredientName})
        let historic = await selectElementsTableDY(tableName, 'ingredient', ingredientName)
        console.log({ ingredientId, historic })

        // // filtramos por compras vacias
        // historic = historic.filter((x) => {
        //     const quantity = x.quantitySold ? x.quantitySold : x.quantityUsed;
        //     if (quantity !== 0) return x
        // })

        // Ordenar el array de manera ascendente según la clave 'fecCrea'
        historic.sort((a, b) => a.fecCrea - b.fecCrea);

        const purchaseHistory = historic.map((x) => {

            const quantity = typeof x.quantitySold === 'number' ? x.quantitySold : x.quantityUsed;
            let date = new Date(x.fecCrea);
            return {
                date: date.toLocaleString('es-PE', options),
                order: x['ID-MARKET'].split('-')[0],
                type: typeof x.quantitySold === 'number' ? x.quantitySold === 0 ? 'Compra Nula': 'Compra': 'Uso',
                quantity: typeof x.quantitySold === 'number' ? x.quantitySold === 0 ? '0' : `+ ${quantity}` : `- ${quantity}`,
            }
        })
        return res.status(200).json({ success: true, purchaseHistory: inventarioInicial.concat(purchaseHistory) });
    } catch (error) {
        console.error(`Error consiguiendo el inventario de la tabla ${tableName}`);
        return res.status(500).json({ message: `Error in conexion to dynamo ${tableName}.` });
    }

}
