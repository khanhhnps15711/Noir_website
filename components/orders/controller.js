const orderService = require ('./service');
const date = require('../../utils/date');

/**
 * lấy cart theo user_id
 */

exports.getAllOrders = async (user_id) => {
    let data = await orderService.getAllOrders(user_id);
     data= data.map(item =>{
         item = {
            date: date.format(item.date),
             _id: item._id,
             status: item.status,
             total: item.total,
             products: item.products,
             shipping_fee: item.shipping_fee,
             user_id: item.user_id,
             user_name: item.user_name,
             user_phonenumber: item.user_phonenumber,
             user_address: item.user_address,
             pay_id: item.pay_id
         }
         return item;
     })
     return data;
}

exports.getOrders = async () => {
    let data = await orderService.getOrders();
     data= data.map(item =>{
         item = {
            date: date.format(item.date),
             _id: item._id,
             status: item.status,
             total: item.total,
             shipping_fee: item.shipping_fee,
             user_id: item.user_id,
             user_name: item.user_name,
             user_phonenumber: item.user_phonenumber,
             user_address: item.user_address,
             pay_id: item.pay_id
         }
         return item;
     })
     return data;
}

exports.getById= async (id) => {
    try{
        let item = await orderService.getById(id);
            item = {
               date: date.format(item.date),
                _id: item._id,
                status: item.status,
                total: item.total,
                shipping_fee: item.shipping_fee,
                user_id: item.user_id,
                user_name: item.user_name,
                user_phonenumber: item.user_phonenumber,
                user_address: item.user_address,
                pay_id: item.pay_id
            }
            return item;
        }
     catch (error) {
        console.log('error',error);
        return null;
    }
}

exports.getByIdOder= async (id) => {
    try{
        let item = await orderService.getById(id);
            item = {
                products: item.products,
            }
            return item;

        }
     catch (error) {
        console.log('error',error);
        return null;
    }
}

exports.insert = async (status, total,  products,  shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address) =>{
await orderService.insert(status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address);
}

exports.update = async (id, status) =>{
    await orderService.update(id, status);
}