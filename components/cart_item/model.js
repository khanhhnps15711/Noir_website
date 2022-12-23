const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart_itemSchema = new Schema({
    id: { type: ObjectId },
    quantity: { type: String },
    price: { type: String },
    cart_id: { type: Schema.Types.ObjectId, ref: 'cart' },
    product_id: { type: Schema.Types.ObjectId, ref: 'product' }

});

module.exports = mongoose.model('cart_item', cart_itemSchema);