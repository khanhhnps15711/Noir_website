const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String, required: true },
    password: { type: String },
    name: { type: String , required: true},
    phone_number: { type: String , required: true},
 
    address: { type: String , required: true},
    roles: {type: String}
});

module.exports = mongoose.model('user', userSchema);
//user là tên bảng 