/**
 * 
 * xử lý data
 */

 const productService = require('./service');
 const date = require('../../utils/date');
 
 
 exports.getProducts = async () =>{
     let data = await productService.getProducts();
     data= data.map(item =>{
         item = {
            date: date.format(item.date),
             _id: item._id,
             name: item.name,
             price: item.price,
             description: item.description,
             available: item.available,
             category_id: item.category_id,
             image: item.image,
         }
         return item;
     })
     return data;
 }
 
 
 exports.getById = async (id) => {
    try {
     let product = await productService.getById(id);
         product = {
            date: date.format(product.date),
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            available: product.available, 
            category_id: product.category_id,

         }
     return product;
    }
    catch (error) {
        console.log('error',error);
        return null;
    }
}

exports.search = async (name) =>{
    let data = await productService.search(name);
    data= data.map(item =>{
        item = {
           date: date.format(item.date),
            _id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            available: item.available,
            category_id: item.category_id,
            image: item.image,
        }
        return item;
    })
    return data;
}
 
 
 exports.insert = async (body) =>{     
        await productService.insert(body);
     }
 
 
 exports.delete = async (id) => {
     await productService.delete(id);
 }
 
 exports.update = async (id, product) =>{
     await productService.update(id, product)
 }