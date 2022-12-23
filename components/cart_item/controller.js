const cart_itemService = require ('./service');


/**
 * lấy cart theo user_id
 */


exports.getAll = async (cart_id) => {
    let cart_item = await cart_itemService.getAll(cart_id);
    cart_item= cart_item.map(item =>{
        item = {
            _id: item._id,
            price: item.price,
            quantity: item.quantity,
            cart_id: item.cart_id,
            product_id: item.product_id
        }
        return item;
    })
    return cart_item;
}

exports.insert = async (price, quantity, cart_id, product_id) =>{
    let cart_item = await cart_itemService.getallcart_item(cart_id, product_id);
    if(cart_item) return null;
   await cart_itemService.insert(price, quantity, cart_id, product_id);
 return {price : price , quantity : quantity, cart_id : cart_id, product_id}
}
/*
exports.insert = async (user_id) => {
    const cart_id = await cartService.getByUserId(user_id);
  
    let carts = await cartService.getallcart(user_id);
    if (carts) return { _id: cart_id._id, user_id: cart_id.user_id };
  
  
    carts = await cartService.insert(user_id);
  
    return { _id: carts._id, user_id: carts.user_id };
  };
*/

exports.update = async (id, price, quantity) =>{
    await cart_itemService.update(id, price, quantity);

}

exports.delete = async (id) =>{
    await cart_itemService.delete(id);
}