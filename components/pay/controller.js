const payService = require('./service');

exports.getPays = async() => {
    let data = await payService.getPays();
     data= data.map(item =>{
         item = {
             _id: item._id,
             pay: item.pay,  
         }
         return item;
     })
     return data;
}