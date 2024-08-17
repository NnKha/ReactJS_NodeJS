import axios from 'axios';
import { loadCartFromLocalStorage } from './localStorageHelpers';

// Lưu giỏ hàng vào server (thay đổi URL và cấu hình theo yêu cầu)
export const saveCartToServer = async (cart, userId) => {
    try {
        await axios.post(`http://localhost:3000/users/${userId}/cart`, { cart });
    } catch (error) {
        console.error('Failed to save cart to server:', error);
    }
};

// Tải giỏ hàng từ server (thay đổi URL và cấu hình theo yêu cầu)
export const loadCartFromServer = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${userId}/cart`);
        return response.data.cart;
    } catch (error) {
        console.error('Failed to load cart from server:', error);
        return [];
    }
};

// Lưu giỏ hàng local vào server sau khi đăng nhập
export const saveLocalCartToServer = async (userId) => {
    const cart = loadCartFromLocalStorage();
    await saveCartToServer(cart, userId);
};
