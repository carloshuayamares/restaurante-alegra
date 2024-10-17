// Importar el SDK de AWS
const AWS = require('aws-sdk');

const { reInventoryController } = require('./jobs')

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

const queueURL = process.env.AWS_URL_SQS_FIFO

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
        console.log('Item guardado exitosamente.', item);
        return response
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

const sendMessageSQS = async (data, intento, group) => {
    const sqs = new AWS.SQS();
    // Configura los parámetros para enviar el mensaje
    const params = {
        MessageBody: JSON.stringify({ ...data, intento, texto: "Este es un mensaje a una cola FIFO" }), // Mensaje en formato JSON
        QueueUrl: queueURL, // URL de la cola FIFO
        MessageGroupId: group, // Obligatorio para FIFO, debe ser único dentro de un grupo de mensajes
        MessageDeduplicationId: "unicoId" + Date.now() // Obligatorio, puede ser único por mensaje o generar automáticamente
    };

    try {
        const data = await sqs.sendMessage(params).promise()
        console.log("Mensaje enviado con éxito", data.MessageId);
    } catch (err) {
        console.error("Error al enviar el mensaje", err);
    }
}

const receiveMessageSQS = async () => {
    const sqs = new AWS.SQS();

    const params = {
        QueueUrl: queueURL,
        MaxNumberOfMessages: 1, // Recibir solo un mensaje a la vez
        WaitTimeSeconds: 0, // Long polling para optimizar el consumo de mensajes
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (data.Messages && data.Messages.length > 0) {
            const message = data.Messages[0];
            console.log("Mensaje recibido de SQS:", message.Body);

            // Después de procesar el mensaje, lo eliminamos de la cola
            const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: message.ReceiptHandle
            };
            await sqs.deleteMessage(deleteParams).promise();
            console.log("Mensaje eliminado con éxito");

            // Aquí puedes procesar el mensaje como desees
            const messageBody = JSON.parse(message.Body);
            console.log("Procesando mensaje:", messageBody);
            await reInventoryController(messageBody)

            return messageBody
        } else {
            console.log({ message: 'No hay mensajes disponibles en la cola' });
        }
    } catch (error) {
        console.error("Error al recibir el mensaje:", error);
    }
}

const updateItemDY = async (tableName, orderId, SK, nuevosDatos) => {
    const params = {
        TableName: tableName, // Nombre de la tabla
        Key: {
            'orderId': orderId, // Clave primaria del elemento que quieres actualizar
            'ID-RECIPE': SK,
        },
        UpdateExpression: 'set #status = :nuevoEstado, #waiting = :descripcionEspera', // Expresión de actualización
        ExpressionAttributeNames: {
            '#status': 'status', // Nombre del campo que quieres actualizar
            '#waiting': 'waiting' // Otro campo a actualizar (opcional)
        },
        ExpressionAttributeValues: {
            ':nuevoEstado': nuevosDatos.nuevoEstado, // Nuevo valor para el campo
            ':descripcionEspera': nuevosDatos.descripcionEspera // Otro nuevo valor
        },
        ReturnValues: 'UPDATED_NEW' // Opcional: devolver los valores actualizados
    };

    try {
        const result = await dynamoDB.update(params).promise();
        console.log("Elemento actualizado con éxito:", result);
        return result;
    } catch (error) {
        console.error("Error al actualizar el elemento:", error);
        throw error;
    }
};

module.exports = {
    countItemsInDynamo,
    saveItemInDynamo,
    sendMessageSQS,
    receiveMessageSQS,
    updateItemDY,
}
