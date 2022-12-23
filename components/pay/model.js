const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const paySchema = new Schema({
    id: {type: ObjectId},
    pay: {type: String},

});
module.exports = mongoose.model('pay', paySchema);