import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Login = ({ setUserName }) => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser)
            const fullName = user.data.fullName
            // alert("Bạn đã đăng nhập rồi");

            setUserName(fullName);
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            phone: formData.phone,
            password: formData.password
        };

        const response = await axios.post('http://localhost:3000/users/login', dataToSend);
        const data = response.data;
        const status = data.status;

        if (status === 200) {
            localStorage.setItem("user", JSON.stringify(data));

            alert("Đăng Nhập Thành Công !!")
            setUserName(data.fullName);
            window.location.reload("/");
            // navigate("/");
            console.log(data.fullName);

        } else {
            alert("Sai tài khoản hoặc mật khẩu");
            console.error('Login failed:', data);
        }

    };

    return (
        <div>
            <section className="login">
                <div className="box-layout">
                    <div className="form__account">
                        <div className="account__inner">
                            <div className="account__inner--title">
                                <h1 className="heading-title">ĐĂNG NHẬP</h1>
                            </div>
                            <form id="form-login" onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label>Số điện thoại</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        placeholder="Số điện thoại..."
                                        type="number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Mật khẩu</label>
                                    <input
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                    />
                                    <label className="remember">Ghi nhớ thông tin</label>
                                    <Link to='' className="control__reset" >
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <input
                                    className="btn user__cta"
                                    id="btn-login"
                                    name="btn-login"
                                    type="submit"
                                    value="ĐĂNG NHẬP"
                                />
                            </form>
                        </div>
                        <div className="sidebar__user">
                            <h2 className="sidebar__user--heading">Xin chào, Bạn</h2>
                            <p className="sidebar__user--desc">
                                Hãy bắt đầu với chúng tôi. Nếu bạn chưa có tài khoản.
                            </p>
                            <div>
                                <Link to='/register'>
                                    <button className="btn user__cta">ĐĂNG KÝ</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
