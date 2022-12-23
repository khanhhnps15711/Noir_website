const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imageSchema = new Schema({
    id: { type: ObjectId },
    image: { type: String },
    product_id: { type: Schema.Types.ObjectId, ref: 'product' }

});

module.exports = mongoose.model('image', imageSchema);