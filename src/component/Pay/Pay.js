import React, { Component } from 'react';
import '../../asserts/Pay.css';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { getCurrentUser } from '../../services/userService';
import { getToken } from '../../services/localStorageService';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            address: '',
            phone: '',
            email: '',
            note: '',
            paymentMethod: '',
            error: '',
            cartItems: [],
        };
    }

    componentDidMount() {
        this.loadUserData();
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        this.setState({ cartItems });
    }
    loadUserData = async () => {
        try {
            const userData = await getCurrentUser();
            if (userData && userData.result) {
                this.setState({
                    username: userData.result.username || '',
                    phone: userData.result.numberPhone || '',
                    email: userData.result.email || '',
                    address: userData.result.address || ''
                });
            } else {
                this.setState({ error: 'Không thể lấy thông tin người dùng.' });
            }
        } catch (error) {
            this.setState({ error: 'Không thể lấy thông tin người dùng.' });
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    createOrderData = () => {
        const { paymentMethod, cartItems } = this.state;

        return {
            payment: paymentMethod === 'VNPAY' ? 1 : 0, // 1 là VNPAY, 0 là COD
            orderDetails: this.createOrderDetails(),
        };
    };
    createOrderDetails = () => {
        const { cartItems } = this.state;
        return cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            productPrice: item.price
        }));
    };

    handleSubmit = async () => {
        const orderData = this.createOrderData();

        try {
            const response = await axios.post('http://localhost:8080/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.result.paymentUrl) {
                window.location.href = response.data.result.paymentUrl;
            } else {
                alert('Đặt hàng thành công.');
            }
        } catch (error) {
            if (error.response) {
                alert(`Có lỗi xảy ra: ${error.response.data.message || 'Không xác định'}`);
            } else {
                alert('Đã xảy ra lỗi trong quá trình gửi yêu cầu.');
            }
        }
    };
    render() {
        const { username, address, phone, email, paymentMethod, error, cartItems } = this.state;
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return (
            <div>
                <Header />
                <div className='container' style={{ marginTop: 120 }}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="back d-flex">
                        <Link to="/cart">
                            <p className="title-cart-cart">Trở lại</p>
                        </Link>
                    </div>
                    <div className="form-checkout">
                        <div className='row'>
                            <div className='col-6'>
                                <div>
                                    <h3>Thông Tin Khách Hàng</h3>
                                </div>
                                <div >
                                    <div className="form-group">
                                        <label>Họ và tên:</label>
                                        <p className='mt-2'>{username}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ:</label>
                                        <p className='mt-2'>{address}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại:</label>
                                        <p className='mt-2'>{phone}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <p className='mt-2'>{email}</p>
                                    </div>


                                </div>
                            </div>
                            <div className='col-6'>
                                <div>
                                    <h3>Thông Tin Sản Phẩm</h3>
                                </div>
                                <div>
                                    {cartItems.map((item, index) => (
                                        <div className='row border' key={index}>
                                            <div className='col-4'>
                                                <img src={item.images[0]} alt={item.name} style={{ width: '70%' }} />
                                            </div>
                                            <div className='col-8'>
                                                <div className='d-flex justify-content-between'>
                                                    <div >
                                                        <p className='title-cart'>{item.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className='title-cart'>{item.price.toLocaleString()} VND</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-start'>
                                                    <p>Số Lượng: {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='d-flex'>
                                    <span>Tạm tính:<span className='title-cart ml-3'>{totalAmount.toLocaleString()} VNĐ</span></span>
                                </div>
                                <div className="form-group">
                                    <select name="paymentMethod" value={paymentMethod} onChange={this.handleChange}>
                                        <option value="">Chọn phương thức thanh toán</option>
                                        <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                                        <option value="VNPAY">Thanh toán qua VNPay</option>
                                    </select>
                                </div>
                                <div className='d-flex justify-content-start mb-3'>
                                    <span className='d-flex align-items-center mr-3'>Discount: </span>
                                    <span>
                                        <input type='text' placeholder='Nhập mã giảm giá' />
                                    </span>
                                </div>
                                <button type="submit" className="submit-btn" style={{ width: 114 }} onClick={this.handleSubmit}>Xác nhận</button>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
