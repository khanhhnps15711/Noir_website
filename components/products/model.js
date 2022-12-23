const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    available: { type: String},
    description: { type: String },
    date: { type: Date },
    image: {type: String},
});

module.exports = mongoose.model('product', productSchema);