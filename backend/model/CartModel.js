const mongoose = require("mongoose");


const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
});

cartSchema.pre("save", function (next) {
  // Cập nhật tổng số lượng và tổng giá trước khi lưu
  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
