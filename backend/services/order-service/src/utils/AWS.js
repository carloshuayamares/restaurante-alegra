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

const countItemsInDynamo = async (tableName) => {
    const params = {
        TableName: tableName,
        Select: 'COUNT' // Solo queremos contar los ítems, sin recuperar datos
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        console.log(`Cantidad total de ítems: ${data.Count}`);
        return data.Count
    } catch (error) {
        console.error('Error al contar los ítems:', error);
    }
}

const saveItemInDynamo = async (tableName, item) => {
    const params = {
        TableName: tableName,
        Item: item,
    };

    try {
        // Realizar la operación 'put' en DynamoDB de forma asíncrona
        const response = await dynamoDB.put(params).promise();
        console.log('Item guardado exitosamente.', response);
        return response
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

const getAllItemsInDynamo = async (tableName) => {
    const params = {
        TableName: tableName,
    };

    try {
        // Usar el método scan para obtener todos los elementos
        const response = await dynamoDB.scan(params).promise();
        return response.Items
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

module.exports = {
    countItemsInDynamo,
    saveItemInDynamo,
    getAllItemsInDynamo,
}
