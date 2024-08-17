var express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../model/UserModel");
var router = express.Router();
const jwt = require("jsonwebtoken");
const {  authen } = require('./auth'); 

// const ACCESS_TOKEN_SECRET = "Your_access_token_secret_key";
// const REFRESH_TOKEN_SECRET = "Your_refresh_token_secret_key";
/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await UserModel.find();
  res.json(data);
});

// register

// router.post("/register", async function (req, res, next) {
//   try {
//     const { fullName, email, password, phone, address } = req.body;
//     const existingUser = await UserModel.findOne({ phone });
//     // const message = existingUser
//     //   ? "Người dùng tồn tại !"
//     //   : "Đăng ký tài khoảng thành công !";

//     if (!existingUser) {
//       await UserModel.create({
//         fullName,
//         email,
//         password,
//         phone,
//         address,
//         role: 0,
//       });
//     }
//   }catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
// }
// });

router.post("/register", async function (req, res, next) {
  try {
    const { fullName, email, password, phone, address } = req.body;

    // Kiểm tra người dùng đã tồn tại chưa
    const existingUser = await UserModel.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Người dùng đã tồn tại!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 0,
    });

    // Tạo token
    const token = jwt.sign({ userId: newUser._id }, "your_jwt_secret_key", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Đăng ký thành công!", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.post("/refreshToken", async function (req, res, next) {
  let { refreshToken } = req.body;
  console.log(refreshToken);
  try {
    const data = jwt.verify(refreshToken, "shhhhh");
    const token = jwt.sign({ user: data.user }, "shhhhh", {
      expiresIn: 1 * 60,
    });
    refreshToken = jwt.sign({ user: data.user }, "shhhhh", {
      expiresIn: 90 * 24 * 60 * 60,
    });
    res.status(200).json({ data: data.user, token, refreshToken });
  } catch (error) {
    res.status(414).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Tìm người dùng theo số điện thoại
    const user = await UserModel.findOne({ phone });

    // Nếu không tìm thấy người dùng hoặc mật khẩu không khớp
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 400,
        message: "Tên đăng nhập hoặc mật khẩu không đúng !!",
        data: null,
      });
    }

    // Tạo token và refresh token
    const token = jwt.sign({ id: user._id }, "shhhhh", { expiresIn: "40s" });
    const refreshToken = jwt.sign({ id: user._id }, "shhhhh", {
      expiresIn: "30d",
    });

    // Dữ liệu trả về
    const data = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    };

    res.status(200).json({
      status: 200,
      message: "Đăng nhập thành công !!",
      data,
      refreshToken,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Lỗi server" });
  }
});

module.exports = router;
