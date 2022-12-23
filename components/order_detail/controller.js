const order_detailService = require('./service')


/**
 * 
 */

 exports.getOrder_detail = async (order_id) => {
    let data = await order_detailService.getOrder_detail(order_id);
     data= data.map(item =>{
         item = {
             _id: item._id,
             quantity: item.quantity,
            price: item.price,
             order_id: item.order_id,
             product_id: item.product_id
         }
         return item;
     })
     return data;
}

exports.insert = async (quantity, price, order_id, product_id) =>{
await order_detailService.insert(quantity, price, order_id, product_id);
}
