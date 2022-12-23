const categoryModel = require('./model');
//lay ds categories
exports.getCategories = async () =>{
    // return data
    // 
    return await categoryModel.find();
}


/**
 * lấy thông tin 1 danh muc
 */

 exports.getById = async (id) => {
  const category = await categoryModel.findById(id);
  return category;
}


/**
* them mới sản phẩm
*/

exports.insert = async  (category) =>{
const p = new categoryModel(category);
await p.save();
}


/**
* sữa thông tin sp
* spread operator
*/

exports.update = async (id, category) => {

  await categoryModel.findByIdAndUpdate(id, category);
}