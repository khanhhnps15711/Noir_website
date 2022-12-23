const cart_itemModel = require('./model');

/*
lấy thông tin từng cart item

*/

exports.getAll = async (cart_id) => {
    const cart = await cart_itemModel.find({cart_id: cart_id}).populate('product_id').populate('cart_id');
    return cart;
}

exports.getallcart_item = async (cart_id , product_id) =>{
    const cart_item = cart_itemModel.findOne({ cart_id: cart_id , product_id: product_id  });
    return cart_item;
}



/**
* them mới cart_item
*/
exports.insert = async (price, quantity, cart_id, product_id) => {
    const p = new cart_itemModel({price, quantity, cart_id, product_id});
    await p.save();
}

/**
 * cập nhật giá tiền và số lượng sản phẩm
 */

exports.update = async (id, price, quantity) => {
    await cart_itemModel.findByIdAndUpdate(id, price, quantity);
}

exports.delete = async (id) => {
    await cart_itemModel.findByIdAndDelete(id);
}

