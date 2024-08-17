import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { removeCart, removeItem, updateItem } from "../Redux/slices/cartSlice";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function Cart() {
     const navigate = useNavigate();
     const cartItems = useSelector((state) => state.cart);
     console.log(cartItems);
     const user = useSelector((state) => state.user);
     const [fullName, setFullName] = useState("");
     const [phone, setPhone] = useState("");
     const [address, setAddress] = useState("");
     const closeBtn = useRef();
     // console.log(cartItems);

     const dispatch = useDispatch();
     const total = cartItems.reduce((acc, item) => {
          return acc + (item.price_new * item.sl)
     }, 0)
     // console.log(total);

     // const data = JSON.parse(localStorage.getItem('persist:cart'));
     // let cart = JSON.parse(data.cart);
     // let cartItems = cart[0];
     // console.log(cart[0]._id);


     const submit = async (e) => {
          e.preventDefault();
          const orderDetails = {
               fullName,
               phone,
               address,
               items: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.sl,
                    name: item.name,
                    price: item.price_new,
               })),
               total,
          };

          try {
               const response = await axios.post('http://localhost:3000/orders', orderDetails);
               alert("Đặt hàng thành công !");
               dispatch(removeCart());
               closeBtn.current.click();
               navigate('/');
               //     console.log(response.data);

          } catch (error) {
               console.error("There was an error submitting the order!", error);
          }
     };
     // Kiểm tra nếu cartItems không tồn tại hoặc không phải là một mảng
     if (!cartItems || cartItems.length === 0) {
          return <div className="showCart">
               <h2 className="text-center my-4"><strong>Giỏ Hàng</strong></h2>
               <h1 className="box-cart">Giỏ Hàng Trống</h1>
          </div>
     }


     return <>
          <div className="showCart">
               <h2 className="text-center my-4"><strong>Giỏ Hàng</strong></h2>
               <div className="box-cart">
                    <table className="table">
                         <thead className="text-center">
                              <tr>
                                   <th>Sản Phẩm</th>
                                   <th>Giá Bán</th>
                                   <th>Số Lượng</th>
                                   <th>Thành Tiền</th>
                                   <th>Thao Tác</th>
                              </tr>
                         </thead>
                         <tbody className="text-center">
                              {cartItems.map((product, index) => {
                                   return (
                                        <tr key={index} className="align-middle">
                                             <td className="text-start">
                                                  <img className="img-thumbnail me-3" style={{ width: 60 + "px" }} src={"http://localhost:3000/img/" + product.product_image} alt="" />
                                                  <strong>{product.name}</strong>
                                             </td>
                                             <td>{(product.price_new * 1).toLocaleString()}</td>
                                             <td className="">
                                                  <input type="number" className="form-control text-center m-auto"
                                                       style={{ width: 100 + "px" }}
                                                       defaultValue={product.sl}
                                                       min={1}
                                                       onChange={(e) => {
                                                            const sl = parseInt(e.target.value); // Chuyển đổi giá trị thành số nguyên
                                                            dispatch(updateItem({ product, sl })); // Gửi action với giá trị số
                                                       }}
                                                  />
                                             </td>
                                             <td>{(product.sl * product.price_new).toLocaleString()}đ</td>
                                             <td>
                                                  <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(removeItem({ product }))}>
                                                       <strong>x</strong>
                                                  </button>
                                             </td>
                                        </tr>
                                   )
                              })}
                         </tbody>
                         <tfoot className="text-center">
                              <tr>
                                   <th colSpan={4} className="text-end">TỔNG THÀNH TIỀN :</th>
                                   <th colSpan={1} className="text-start">{total.toLocaleString()}đ</th>
                              </tr>
                         </tfoot>
                    </table>
                    <div>
                         <button
                              className="btn btn-primary btn-lg"
                              data-bs-target="#exampleModal"
                              data-bs-toggle="modal"
                              type="button"
                         >
                              Đặt Hàng
                         </button>
                         <div
                              aria-hidden="true"
                              aria-labelledby="exampleModalLabel"
                              className="modal fade"
                              id="exampleModal"
                              tabIndex="-1"
                         >
                              <form className="modal-dialog" onSubmit={submit}>
                                   <div className="modal-content">
                                        <div className="modal-header">
                                             <h1
                                                  className="modal-title fs-5"
                                                  id="exampleModalLabel"
                                             >
                                                  Thông Tin Giao Hàng !
                                             </h1>
                                             <button
                                                  aria-label="Close"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  type="button"
                                                  ref={closeBtn}
                                             />
                                        </div>
                                        <div className="modal-body">
                                             <div className="mb-3">
                                                  <label
                                                       className="form-label"
                                                       htmlFor="fullName"
                                                  >
                                                       Họ Tên
                                                  </label>
                                                  <input
                                                       className="form-control"
                                                       id="fullName"
                                                       type="text"
                                                       onChange={(e) => setFullName(e.target.value)}
                                                  />
                                             </div>
                                             <div className="mb-3">
                                                  <label
                                                       className="form-label"
                                                       htmlFor="phone"
                                                  >
                                                       Số Điện Thoại
                                                  </label>
                                                  <input
                                                       className="form-control"
                                                       id="phone"
                                                       type="text"
                                                       onChange={(e) => setPhone(e.target.value)}
                                                  />
                                             </div>
                                             <div className="mb-3">
                                                  <label
                                                       className="form-label"
                                                       htmlFor="address"
                                                  >
                                                       Địa Chỉ
                                                  </label>
                                                  <input
                                                       className="form-control"
                                                       id="address"
                                                       type="text"
                                                       onChange={(e) => setAddress(e.target.value)}
                                                  />
                                             </div>

                                        </div>
                                        <div className="modal-footer">
                                             <button
                                                  className="btn btn-secondary"
                                                  data-bs-dismiss="modal"
                                                  type="button"
                                             >
                                                  Hủy
                                             </button>
                                             <button
                                                  className="btn btn-primary"
                                                  type="submit"
                                             >
                                                  Xác Nhận
                                             </button>
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     </>
}

