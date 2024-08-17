import React from 'react'
import { Link } from 'react-router-dom'

export default function ListProduct(props) {
     // console.log(props);
     return (
          <>
               <div>
                    <section className="slide-bar container-fluid">
                         <div className="box-slide">
                              <div className="box-item-product d-flex flex-wrap ">                                   
                                   {props.data && props.data.map((product,index) => (
                                   <div className="item-product text-center bg-dark"  key= {index}>
                                             <Link to={`/productDetail/${product._id}`} >
                                                  <img
                                                       alt=""
                                                       src={"http://localhost:3000/img/" + product.product_image}
                                                  />
                                                  <h3 className="name">
                                                       {product.name}
                                                  </h3>
                                                  <span className="price">
                                                       {(product.price_new).toLocaleString()}
                                                       <sup>
                                                            đ
                                                       </sup>
                                                       <strike>
                                                       {(product.price_old).toLocaleString()}
                                                            <sup>
                                                                 đ
                                                            </sup>
                                                       </strike>
                                                       <small>
                                                            -15%
                                                       </small>
                                                  </span>
                                             </Link>
                                        

                                   </div>
                                   ))}
                              </div>
                         </div>
                    </section>
               </div>
          </>
     )
}
