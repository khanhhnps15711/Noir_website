const imageService = require('./service');


// lay toan bo hinh anh
exports.getImages = async () =>{
    let data = await imageService.getImages();
    data = data.map(item => {
        item = {
            _id : item._id,
            image : item.image,
            product_id : item.product_id
        }
        return item;
    })
    return data;
}

// lay hinh anh theo id

exports.getImagesById = async (id) =>{
        let data = await imageService.getById(id);
        data = data.map(item => {
            item = {
                _id : item._id,
                image : item.image,
                product_id : item.product_id
            }
            return item;
        })
        return data;
}

exports.getImagesById1 = async (id) =>{
    let data = await imageService.getById(id);
    data = data.map(item => {
        item = {
            _id : item._id,
            image : item.image,
            product_id : item.product_id
        }
        return item;
    })
    return data;
    
}

exports.insert_image = async (body) =>{
    await imageService.insert(body);
}

exports.update = async (id, img) =>{
    await imageService.update(id, img);
}
