const orderModel = require('./model');


/**
* them mới order
*/
exports.insert = async (status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address) => {
    const p = new orderModel({status, total, products , shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address});
    await p.save();
}

/**
 * cập nhật trạng thái cho order
 */

exports.update = async (id, status) => {
    await orderModel.findByIdAndUpdate(id, status);
}

/**
 * xem danh sách order
 * 
 */

exports.getAllOrders = async (user_id) => {
    const orders = await orderModel.find({user_id: user_id}).populate('user_id');
    return orders;
}
exports.getOrders = async () => {
    const orders = await orderModel.find().populate('user_id');
    return orders;
}
exports.getById = async (id) => {
    const orders = await orderModel.findById(id);
    return orders;
}

exports.getByIdOder = async (id) => {
    const orders = await orderModel.findById(id);
    return orders;
}
