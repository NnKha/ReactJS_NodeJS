const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const itemSchema = new Schema({
    productId: {
      type: Objectid,
      ref: 'Product', // Liên kết tới model 'Product'
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }, { _id: false });
  
  // Định nghĩa schema cho Order
  const order = new Schema({
    fullname: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    items: [itemSchema], // Sử dụng schema items đã định nghĩa
    total: {
      type: Number,
      required: true
    }
  }, { timestamps: true });
 

module.exports = mongoose.models.order || mongoose.model('order',order);
