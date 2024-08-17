const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const user = new Schema({
  id: { type: Objectid },
  phone: { type: String },
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: Number },
  address: { type: String },
  reset_token: { type: String },
});

// // Mã hóa mật khẩu trước khi lưu
// user.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
module.exports = mongoose.models.user || mongoose.model("user", user);
