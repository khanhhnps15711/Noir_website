const cartModel = require('./model');

/*
lấy thông tin cart theo user_id

*/

exports.getByUserId = async (user_id) => {
    const cart = await cartModel.findOne({user_id: user_id} , 'id user_id ');
    return cart;
}
exports.getallcart = async (user_id) =>{
      const cart = cartModel.findOne({ user_id: user_id });
      return cart;
  }


/**
* them mới cart
*/
exports.insert = async ( user_id) => {
    const p = new cartModel({ user_id});
    return await p.save();
}


/**
 * cập nhật giá tiền cho cart
 */

exports.update = async (id, total) => {
    await cartModel.findByIdAndUpdate(id, total);
}

