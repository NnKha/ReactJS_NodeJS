import "../../assets/css/home.css";
import "../../assets/css/listProduct.css";
import "../../assets/css/user.css";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import{useEffect} from 'react'

export default function Header({ userName, setUserName }) {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUserName(''); 
        alert("Đăng xuất thành công !!");
        navigate("/"); 
    };

    return (
        <header className="container-fluid">
            <div className="box-header d-flex justify-content-between align-items-center">
                <div>
                    <Link to='/'>
                        <img
                            alt=""
                            className="img-logo"
                            src="./img/logotopzone.jpg"
                        />
                    </Link>
                </div>
                <ul className="menu-header reset-list d-flex">
                    <li>
                        <Link to='/listPrd/65ef17cecce6ab14801fd9b7'>iPhone</Link>
                    </li>
                    <li>
                        <Link to='/listPrd/65ef17fccce6ab14801fd9bb'>Mac</Link>
                    </li>
                    <li>
                        <Link to='/listPrd/65ef1840cce6ab14801fd9bc'>iPad</Link>
                    </li>
                    <li>
                        <Link to='/listPrd/65ef186ecce6ab14801fd9bd'>Watch</Link>
                    </li>
                    <li>
                        <Link to='/listPrd/65f402eadb3f6e99065b15bf'>Tai nghe, Loa</Link>
                    </li>
                    <li>
                        <Link to='/listPrd/65f4032edb3f6e99065b15c0'>Phụ Kiện</Link>
                    </li>
                    <li>
                        <Link to='/listPrd'>TekZone</Link>
                    </li>
                </ul>
                <div className="search-cart d-flex gap-4">
                    <div className="search">
                        <img
                            alt=""
                            src="./img/search.svg"
                        />
                    </div>
                    <div>
                        <Link to="/cart">
                            <img
                                alt=""
                                src="./img/shopping-cart.svg"
                            />
                        </Link>
                        <div className="badge text-bg-light ms-1">{cart.length}</div>
                    </div>
                </div>
                <div className="dropdown">
                    <a
                        aria-expanded="false"
                        className="btn btn-dark dropdown-toggle"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                    >
                        {userName || 'Tài Khoản'}
                    </a>
                    <ul className="dropdown-menu">
                        {!userName ? (
                            <>
                                <li>
                                    <Link to="/login" className="dropdown-item">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="dropdown-item">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <div onClick={handleLogout} className="dropdown-item">
                                    Logout
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}
