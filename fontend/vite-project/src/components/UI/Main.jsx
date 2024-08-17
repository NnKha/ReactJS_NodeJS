import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';

import ListProduct from "./layout-product/ListProduct";
import CateName from "./CateName";

export default function Main() {
     const [categories, setCate] = useState([]);
     const [productsLimit, setProductsLimit] = useState([]);
     useEffect(() => {
          const fetchCate = async () => {
               try {
                    const response = await axios.get('http://localhost:3000/categories');
                    setCate(response.data);
               } catch (error) {
                    console.error('Error fetching Categories:', error);
               }
          };

          fetchCate();
     }, []);


     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    const productsByCategory = {};

                    for (const category of categories) {
                         const response = await axios.get(`http://localhost:3000/products/cate/${category._id}`);

                         productsByCategory[category._id] = response.data.dataLimit;
                         // console.log(response.data.dataLimit);
                    }
                    setProductsLimit(productsByCategory);
               } catch (error) {
                    console.error('Error fetching products:', error);
               }

          };
          if (categories.length > 0) {
               fetchProducts();
          }
     }, [categories]);

     // console.log(productsLimit);

     return (
          <>
               <div>
                    <section className="slide-bar container-fluid">
                         <div
                              className="carousel slide"
                              data-bs-ride="carousel"
                              id="carouselExampleIndicators"
                         >
                              <div className="carousel-indicators">
                                   <button
                                        aria-current="true"
                                        aria-label="Slide 1"
                                        className="active"
                                        data-bs-slide-to="0"
                                        data-bs-target="#carouselExampleIndicators"
                                        type="button"
                                   />
                                   <button
                                        aria-label="Slide 2"
                                        data-bs-slide-to="1"
                                        data-bs-target="#carouselExampleIndicators"
                                        type="button"
                                   />
                                   <button
                                        aria-label="Slide 3"
                                        data-bs-slide-to="2"
                                        data-bs-target="#carouselExampleIndicators"
                                        type="button"
                                   />
                                   <button
                                        aria-label="Slide 4"
                                        data-bs-slide-to="3"
                                        data-bs-target="#carouselExampleIndicators"
                                        type="button"
                                   />
                              </div>
                              <div className="carousel-inner">
                                   <div className="carousel-item active">
                                        <img
                                             alt="..."
                                             className="d-block w-100"
                                             src="/img/2880-800-2-1920x533-2.png"
                                        />
                                   </div>
                                   <div className="carousel-item">
                                        <img
                                             alt="..."
                                             className="d-block w-100"
                                             src="/img/2880-800-7-1920x533-1.png"
                                        />
                                   </div>
                                   <div className="carousel-item">
                                        <img
                                             alt="..."
                                             className="d-block w-100"
                                             src="/img/2880-800-11-1920x533-1 (1).png"
                                        />
                                   </div>
                                   <div className="carousel-item">
                                        <img
                                             alt="..."
                                             className="d-block w-100"
                                             src="/img/2880x800-1920x533.png"
                                        />
                                   </div>
                              </div>
                              <button
                                   className="carousel-control-prev"
                                   data-bs-slide="prev"
                                   data-bs-target="#carouselExampleIndicators"
                                   type="button"
                              >
                                   <span
                                        aria-hidden="true"
                                        className="carousel-control-prev-icon"
                                   />
                                   <span className="visually-hidden">
                                        Previous
                                   </span>
                              </button>
                              <button
                                   className="carousel-control-next"
                                   data-bs-slide="next"
                                   data-bs-target="#carouselExampleIndicators"
                                   type="button"
                              >
                                   <span
                                        aria-hidden="true"
                                        className="carousel-control-next-icon"
                                   />
                                   <span className="visually-hidden">
                                        Next
                                   </span>
                              </button>
                         </div>

                         <ul className="box-cate d-flex justify-content-between" >
                              {categories.map((cate, index) => (
                                   <li className="item-cate bg-dark " key={index}>
                                        <Link to={`listPrd/${cate._id}`}
                                             className="text-decoration-none "
                                             href=""
                                        >
                                             <img
                                                  alt=""
                                                  src={"http://localhost:3000/img/" + cate.image}
                                             />
                                             <span className="d-flex justify-content-center text-white">
                                                  {cate.name}
                                             </span>
                                        </Link>
                                   </li>
                              ))}
                         </ul>

                         {categories.map(category => (
                              <>
                              <CateName>{category.name}</CateName>
                              <div key={category._id}>
                                   <ListProduct data={productsLimit[category._id]} />
                              </div>
                              </>
                         ))}



                         {/* <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <img
                                        alt=""
                                        className="logo-apple"
                                        src='/img/apple.svg'
                                   />
                                   <h2 className="desc-list">
                                        iPhone
                                   </h2>
                              </a>
                              <Product categoryId='65ef17cecce6ab14801fd9b7' />
                         </div>
                         <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <img
                                        alt=""
                                        className="logo-apple"
                                        src='/img/apple.svg'
                                   />
                                   <h2 className="desc-list">
                                        Mac
                                   </h2>
                              </a>
                              <Product categoryId='65ef17fccce6ab14801fd9bb' />
                         </div>
                         <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <img
                                        alt=""
                                        className="logo-apple"
                                        src='/img/apple.svg'
                                   />
                                   <h2 className="desc-list">
                                        iPad
                                   </h2>
                              </a>
                              <Product categoryId='65ef1840cce6ab14801fd9bc' />

                         </div>
                         <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <img
                                        alt=""
                                        className="logo-apple"
                                        src='/img/apple.svg'
                                   />
                                   <h2 className="desc-list">
                                        WATCH
                                   </h2>
                              </a>
                              <Product categoryId='65ef186ecce6ab14801fd9bd' />

                         </div>
                         <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <h2 className="desc-list">
                                        Tai nghe, loa
                                   </h2>
                              </a>
                              <Product categoryId='65f402eadb3f6e99065b15bf' />

                         </div>
                         <div className="box-slide">
                              <a
                                   className="d-flex justify-content-center"
                                   href=""
                              >
                                   <h2 className="desc-list">
                                        Phụ kiện
                                   </h2>
                              </a>
                              <Product categoryId='65f4032edb3f6e99065b15c0' />

                         </div> */}
                    </section>
                    <section className="container-fluid justify-content-center delivery">
                         <div className="box-policy container d-flex justify-content-between">
                              <div className="policy">
                                   <img
                                        alt=""
                                        src='img/circle-check-regular.svg'
                                   />
                                   <span>
                                        Mẫu mã đa dạng, chính hãng.
                                   </span>
                              </div>
                              <div className="policy">
                                   <img
                                        alt=""
                                        src='img/truck-solid.svg'
                                   />
                                   <span>
                                        Giao hàng toàn quốc.
                                   </span>
                              </div>
                              <div className="policy">
                                   <img
                                        alt=""
                                        src='img/shield-solid.svg'
                                   />
                                   <span>
                                        Bảo hành cam kết tới 12 tháng.
                                   </span>
                              </div>
                              <div className="policy">
                                   <img
                                        alt=""
                                        src='img/rotate-right-solid.svg'
                                   />
                                   <span>
                                        Đổi trả tại Thegioididong và DienmayXANH.
                                   </span>
                              </div>
                         </div>
                    </section>
               </div>
          </>
     )
}