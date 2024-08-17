// import LogoApple from '../../assets/img/apple.svg';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import CateName from './CateName';
import ListProduct from './layout-product/ListProduct';
import SlideCate from './layout-product/SlideCate';

export default function ListProductUser() {
     const { categoryId } = useParams();
     const [categoryName, setCategoryName] = useState('');
     const [products, setProducts] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [loading, setLoading] = useState(false);

     const fetchProducts = useCallback(async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/products/cate/${categoryId}?page=${currentPage}`);
            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
          } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
          } finally {
            setLoading(false);
          }
     }, [categoryId, currentPage]);

     useEffect(() => {
          fetchProducts();
     }, [fetchProducts]);

     useEffect(() => {
          const fetchCategoryName = async () => {
               try {
                    const response = await axios.get(`http://localhost:3000/categories/${categoryId}`);
                    setCategoryName(response.data.name);
               } catch (error) {
                    console.error('Lỗi khi lấy tên danh mục:', error);
               }
          };

          fetchCategoryName();
     }, [categoryId]);
     // console.log(categoryName);
     const handlePageChange = (selectedItem) => {
          setCurrentPage(selectedItem.selected + 1);
     };

     return (
          <>
               <div>
                    <section className="slide-bar container-fluid">
                         <div className="box-slide">
                              <CateName >{categoryName}</CateName>
                              <SlideCate></SlideCate>
                              <div className="filter-cate container-fluid ">
                                   <a href="">
                                        Tất Cả
                                   </a>
                                   <a href="">{categoryName}</a>
                              </div>
                              <div className="box-item-product d-flex flex-wrap ">
                                   <ListProduct data={products}/>
                              </div>
                              <ReactPaginate
                                   breakLabel="..."
                                   nextLabel="next >"
                                   onPageChange={handlePageChange}
                                   pageRangeDisplayed={3}
                                   pageCount={totalPages}
                                   previousLabel="< previous"
                                   pageClassName="page-item"
                                   pageLinkClassName="page-link"
                                   previousClassName="page-item"
                                   previousLinkClassName="page-link"
                                   nextClassName="page-item"
                                   nextLinkClassName="page-link"
                                   breakClassName="page-item"
                                   breakLinkClassName="page-link"
                                   containerClassName="pagination"
                                   activeClassName="active"
                                   forcePage={currentPage - 1}
                              />
                         </div>
                    </section>
               </div>
          </>
     )
}
