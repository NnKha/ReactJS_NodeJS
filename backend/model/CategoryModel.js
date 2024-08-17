const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const category = new Schema({
    _id: {type: Objectid},
    name:{
        type: String,
        require: true, // bắt buộc phải có
        trim: true, // bỏ khoảng trắng 2 đầu
        unique: true // không được trùng
    },
    image: {type: String}
})
module.exports = mongoose.models.category || mongoose.model('category',category);
