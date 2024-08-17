import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addItem } from '../Redux/slices/cartSlice';


export default function DetailProductUser() {

     const { id } = useParams();
     const [product, setProduct] = useState(null);

     useEffect(() => {
          const fetchProduct = async () => {
               try {
                    const response = await fetch(`http://localhost:3000/products/${id}`);
                    const data = await response.json();
                    setProduct(data);
               } catch (error) {
                    console.error('Error fetching product:', error);
               }
          };

          fetchProduct();
     }, [id]);

     const dispatch = useDispatch();
     const handleAddToCart = (product) =>{
          dispatch(addItem({product,sl: 1}))
          alert('Thêm mới thành công !')
     }

     if (!product) {
          return <div>Đang tải...</div>;
        }
   

     return (
          <>
               <div>
                    <section className="containerProduct">
                         <div className="container">
                              <div
                                   className="boxProduct-detail d-flex justify-content-center"
                                   id="boxProduct-detail "
                              >
                                   <div className="prdDetail-image d-flex justify-content-between align-items-center">
                                        <div className="prdDetail-imageDesc">
                                             <img
                                                  alt="Product Image"
                                                  src= {"http://localhost:3000/img/" + product.product_image}
                                             />
                                        </div>
                                   </div>
                                   <div className="prd-Details">
                                        <h1 className="titleDetail">
                                             {product.name}
                                        </h1>
                                        <div className="descDetail">
                                             <p>
                                                  <span>
                                                       Bộ vi xử lý:{' '}
                                                  </span>1
                                                  {' '}
                                                  <span>
                                                       Intel Core i505200U 2.2 GHz (3MB L3)Cache upto 2.7                                        GHz
                                                  </span>
                                             </p>
                                             <p>
                                                  <span>
                                                       Bộ nhớ RAM:{' '}
                                                  </span>
                                                  <span>
                                                       4 GB (DDR3 Bus 1600 MHz)
                                                  </span>
                                             </p>
                                             <p>
                                                  <span>
                                                       Đồ họa :
                                                  </span>
                                                  {' '}
                                                  <span>
                                                       Intel HD Graphics
                                                  </span>
                                             </p>
                                             <p>
                                                  <span>
                                                       Ổ đĩa cứng :
                                                  </span>
                                                  {' '}
                                                  <span>
                                                       500 GB (HDD)
                                                  </span>
                                             </p>
                                             <p>
                                                  <span>
                                                       Sản phẩm:{' '}
                                                  </span>
                                                  {' '}
                                                  <span>
                                                       Còn hàng
                                                  </span>
                                             </p>
                                        </div>
                                        <div className="priceDetail">
                                             <span>
                                                  {(product.price_new).toLocaleString()}
                                             </span>
                                             <span>
                                             {(product.price_old).toLocaleString()}
                                             </span>
                                        </div>
                                        <button onClick={()=>handleAddToCart(product)} className="add-to-cart">
                                             Thêm vào giỏ hàng
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     )
}