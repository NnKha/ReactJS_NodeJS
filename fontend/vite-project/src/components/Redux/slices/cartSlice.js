import { createSlice } from "@reduxjs/toolkit";
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './localStorageHelpers';
import { saveCartToServer, loadCartFromServer, saveLocalCartToServer } from './serverHelpers';

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage() || [],
  reducers: {
    addItem(state, action) {
      const { product, sl, loggedIn } = action.payload;
      const index = state.findIndex(item => item._id === product._id);

      if (index !== -1) {
        state[index].sl += sl;
      } else {
        product.sl = sl;
        state.push(product);
      }

      if (loggedIn) {
        saveCartToServer(state);
      } else {
        saveCartToLocalStorage(state);
      }
    },
    updateItem(state, action) {
      const { product, sl, loggedIn } = action.payload;
      const index = state.findIndex(item => item._id === product._id);

      if (index !== -1) {
        state[index].sl = Math.max(1, sl);
      }

      if (loggedIn) {
        saveCartToServer(state);
      } else {
        saveCartToLocalStorage(state);
      }
    },
    removeItem(state, action) {
      const { product, loggedIn } = action.payload;
      const index = state.findIndex(item => item._id === product._id);
      
      if (index !== -1) {
        state.splice(index, 1);
      }

      if (loggedIn) {
        saveCartToServer(state);
      } else {
        saveCartToLocalStorage(state);
      }
    },
    removeCart(state) {
      state.length = 0; // Làm trống mảng giỏ hàng
      saveCartToLocalStorage(state); // Cập nhật local storage
    },
    saveCartToAccount(state, action) {
      const { loggedIn } = action.payload;
      if (loggedIn) {
        saveCartToServer(state);
        localStorage.removeItem('cart'); // Xóa giỏ hàng từ local storage sau khi lưu vào server
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase('user/loginSuccess', (state, action) => {
      const userId = action.payload.userId;
      
      // Tải giỏ hàng từ server khi người dùng đăng nhập
      loadCartFromServer(userId).then(serverCart => {
        if (serverCart && serverCart.length > 0) {
          return serverCart;
        }
      });

      // Lưu giỏ hàng từ local storage vào server và xóa giỏ hàng local
      saveLocalCartToServer(userId).then(() => {
        localStorage.removeItem('cart');
      });
    });
  }
});

export const { addItem, removeItem, updateItem, removeCart, saveCartToAccount } = cartSlice.actions;
export default cartSlice.reducer;
