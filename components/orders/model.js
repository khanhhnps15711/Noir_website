const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId },
    status: {type: String},
    total: { type: String },
    products: { type: Array},
    date: { type: Date  , default: new Date },
    shipping_fee: {type: String},
    pay_id: {type: Schema.Types.ObjectId, ref: 'pay'},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    user_name: {type: String},
    user_phonenumber: {type: String},
    user_address: {type: String},
},
);

module.exports = mongoose.model('order', orderSchema);