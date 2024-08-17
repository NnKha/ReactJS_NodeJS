const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const product = new Schema({
    _id: {type: Objectid},
    name:{type: String},
    price_new:{type: Number},
    price_old:{type: Number},
    product_image: {type: String},
    description: {type: String},
    quantity:{type: Number},
    categoryId: {type: Objectid, ref:'category'}
})
module.exports = mongoose.models.product || mongoose.model('product',product);
