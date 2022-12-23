const payModel = require('./model');

exports.getPays = async () => {
    const pay = await payModel.find();
    return pay;
}