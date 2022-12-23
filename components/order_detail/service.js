const order_detailModel = require('./model');

/**
* them mới order
*/
exports.insert = async (quantity, price, order_id, product_id) => {
    const p = new order_detailModel({quantity, price, order_id, product_id});
    await p.save();
}



/**
 * xem danh sách order_detail
 * 
 */

exports.getOrder_detail = async (order_id) => {
    const order_detail = await order_detailModel.find({order_id: order_id}).populate('product_id', 'name');
    return order_detail;
}
