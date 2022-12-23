const imageModel = require('./model');

exports.getImages = async () =>{
    const image = await imageModel.find().populate('product_id');
    return image;
}


exports.getById = async (id) =>{
    const image = await imageModel.find({product_id: id}).populate('product_id');
    return image;
}

exports.getById1 = async (id) =>{
    const image = await imageModel.find({product_id: id});
    return image[0];
}

// add 1 image 
exports.insert = async (img) =>{
    const p = new imageModel(img);
    await p.save();
}

// update image
exports.update = async (id, img) =>{
    await imageModel.findByIdAndUpdate(id, img);
}

// delete image
exports.delete = async (id) =>{
    await imageModel.findByIdAndDelete(id, img);
}