const { updateItemDY } = require('../utils/AWS')

module.exports = async (req, res, next) => {

    const { tableName, orderId, SK, nuevosDatos } = req.body;

    try {
        const response = await updateItemDY(tableName, orderId, SK, nuevosDatos)
        return response
    } catch (error) {
        console.log(error)
    }


}
