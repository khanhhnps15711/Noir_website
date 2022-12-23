const cartService = require("./service");
/**
 * lấy cart theo user_id
 */

exports.getByUserId = async (user_id) => {
  try {
    let data = await cartService.getByUserId(user_id);
    data = {
      _id: data._id,
      user_id: data.user_id,
    };
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

exports.getallcart = async () => {
  try {
    let cart = await cartService.getallcart();
    cart = cart.map((item) => {
      item = {
        _id: item._id,
        total: item.total,
        user_id: item.user_id,
      };
      return item;
    });
    return cart;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.insert = async (user_id) => {
  const cart_id = await cartService.getByUserId(user_id);

  let carts = await cartService.getallcart(user_id);
  if (carts) return { _id: cart_id._id, user_id: cart_id.user_id };


  carts = await cartService.insert(user_id);

  return { _id: carts._id, user_id: carts.user_id };
};

exports.update = async (id, total) => {
  await cartService.update(id, total);
};
