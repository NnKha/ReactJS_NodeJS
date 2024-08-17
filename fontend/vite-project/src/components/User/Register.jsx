import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: '',
        confirm_pass: '',
        email: '',
        address: '',
    });
    const navigate = useNavigate();


    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const submitData = {
            ...formData,
            phone: formData.phone
        };
        const phoneLengthValid = /^(\d{8,10})$/;
        // console.log(submitData);
        // Kiểm tra dữ liệu
        if (!formData.fullName || !formData.phone || !formData.password || !formData.email || !formData.address) {
            setError('Vui lòng điền tất cả các trường.');
            return;
        }
        if (!phoneLengthValid.test(formData.phone)) {
            setError('Số điện thoại phải gồm từ 8 đến 10 chữ số.');
            return;
        }
        if (formData.password !== formData.confirm_pass) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            // Gửi yêu cầu đăng ký đến server
            const response = await axios.post('http://localhost:3000/users/register', submitData);
            // console.log('Phản hồi từ server:', response.data);
            if (response.status === 201) {
                // setSuccessMessage('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
                alert('Đăng ký thành công !!')
                navigate('/login')
                setFormData({
                    fullName: '',
                    phone: '',
                    password: '',
                    confirm_pass: '',
                    email: '',
                    address: '',
                });

            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Người dùng đã tồn tại !!')
        }
    };


    return (
        <section className="register">
            <div className="container">
                <div className="form__account">
                    <div className="sidebar__user">
                        <h1 className="sidebar__user--heading">Xin chào, Bạn</h1>
                        <p className="sidebar__user--desc">
                            Bắt đầu mua sắm với chúng tôi. Nếu bạn đăng ký tài khoản thành công đăng nhập để mua sắm & thanh toán tiện lợi hơn.
                        </p>
                        <div>
                            <Link to='/login'>
                                <button className="btn user__cta">ĐĂNG NHẬP</button>
                            </Link>
                        </div>
                    </div>
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">ĐĂNG KÝ</h1>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        <form id="form-login" onSubmit={handleSubmit}>
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label>Họ tên</label>
                                    <input
                                        value={formData.fullName}
                                        name="fullName"
                                        placeholder="FullName..."
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Số Điện thoại</label>
                                    <input
                                        value={formData.phone}
                                        name="phone"
                                        placeholder="Số điện thoại..."
                                        type="number"

                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label>Mật khẩu</label>
                                    <input
                                        value={formData.password}
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Xác nhận mật khẩu</label>
                                    <input
                                        value={formData.confirm_pass}
                                        name="confirm_pass"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form__group">
                                <label>Email</label>
                                <input
                                    value={formData.email}
                                    name="email"
                                    placeholder="Email ..."
                                    type="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form__group">
                                <label>Địa chỉ</label>
                                <input
                                    value={formData.address}
                                    name="address"
                                    placeholder="Địa chỉ..."
                                    type="text"
                                    onChange={handleChange}
                                />
                            </div>

                            <input
                                className="btn user__cta"
                                id="btn-login"
                                name="btn-reg"
                                type="submit"
                                value="ĐĂNG KÝ"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
