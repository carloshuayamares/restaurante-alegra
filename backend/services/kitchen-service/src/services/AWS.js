// Importar el SDK de AWS
const AWS = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

// Configurar DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    accessKeyId,
    secretAccessKey,
    region,
});

// // Usar el método scan para obtener todos los elementos
// dynamoDB.scan(params, (err, data) => {
//     if (err) {
//         console.error('Error obteniendo los elementos:', err);
//     } else {
//         console.log('Elementos obtenidos:', data.Items);
//     }
// });

const selectElementTableDY = async (tableName, value) => {
    // Parámetros para el scan o query
    const params = {
        TableName: tableName,
        KeyConditionExpression: '#pk = :value', // Cambia esto por tu clave primaria
        ExpressionAttributeNames: {
            '#pk': 'ID-RECIPE'
        },
        ExpressionAttributeValues: {
            ':value': value
        }
    };

    try {
        // es más eficiente cuando puedes filtrar por la clave de partición o por un índice secundario
        const response = await dynamoDB.query(params).promise();
        return response.Items[0]
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

module.exports = {
    selectElementTableDY,
}
