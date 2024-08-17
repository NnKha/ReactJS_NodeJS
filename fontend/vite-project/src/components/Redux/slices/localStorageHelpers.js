// localStorageHelpers.js

// Lưu giỏ hàng vào local storage
export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Tải giỏ hàng từ local storage
export const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
