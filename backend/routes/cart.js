const express = require('express');
const router = express.Router();
const CartModel = require('./models/Cart');




// API thêm hoặc cập nhật sản phẩm trong giỏ hàng
router.post('/cart/:userID', async (req, res) => {
    const { userId, productId, name, quantity, price } = req.body;

    try {
        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Nếu không có giỏ hàng, tạo mới
            cart = new CartModel({ userId, items: [] });
        }

        // Tìm chỉ số sản phẩm trong giỏ hàng
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex !== -1) {
            // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng và tổng giá
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].totalPrice = quantity * price;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            const newItem = {
                productId,
                name,
                quantity,
                price,
                totalPrice: quantity * price
            };
            cart.items.push(newItem);
        }

        // Lưu giỏ hàng đã được cập nhật vào cơ sở dữ liệu
        await cart.save();

        res.status(200).json({ message: 'Giỏ hàng đã được cập nhật', cart });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra', error });
    }
});

module.exports = router;
