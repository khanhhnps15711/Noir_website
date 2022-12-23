const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order_detailSchema = new Schema({
    id: {type: ObjectId},
    quantity: {type: String},
    price: {type: String},
    order_id: {type: Schema.Types.ObjectId, ref: 'order'},
    product_id: {type: Schema.Types.ObjectId, ref: 'product'},
});

module.exports = mongoose.model('order_detail',order_detailSchema );