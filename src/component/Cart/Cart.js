import React, { Component } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';
import '../../asserts/Cart.css'; // Import CSS cho giỏ hàng

export default class Cart_Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
        };
    }

    componentDidMount() {
        // Lấy thông tin giỏ hàng từ localStorage khi component mount
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        this.setState({ cartItems });
    }

    handleIncrement = (index) => {
        const { cartItems } = this.state;
        cartItems[index].quantity += 1; // Tăng số lượng sản phẩm
        this.setState({ cartItems });
    };

    handleDecrement = (index) => {
        const { cartItems } = this.state;
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1; // Giảm số lượng sản phẩm
            this.setState({ cartItems });
        }
    };
    handleRemoveItem = (index) => {
        const { cartItems } = this.state;
        const item = cartItems[index];

        // Hiển thị thông báo xác nhận trước khi xóa
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${item.name}" khỏi giỏ hàng không?`);
        if (confirmDelete) {
            cartItems.splice(index, 1); // Xóa sản phẩm khỏi danh sách
            this.setState({ cartItems });
            localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Cập nhật localStorage
        }
    };
    render() {
        const { cartItems } = this.state;
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        return (
            <div>
                <Header />
                <div className="cart-background" style={{ marginTop: 108 }}>
                    <div className="wrapper">
                        <div className="container-fluid">
                            <div className="back d-flex">
                                <Link to="/">
                                    <p className="title-cart-cart">Trở lại mua hàng</p>
                                </Link>
                            </div>
                            <div className="row">
                                <div className="col-8 border rounded-sm">
                                    <div className="cart-top">
                                        <div className="cart-table">
                                            <div className="row rounded-sm border">
                                                <div className="col-6">
                                                    <p className="title-cart">Sản Phẩm</p>
                                                </div>
                                                <div className="col-2">
                                                    <p className="title-cart">Số Lượng</p>
                                                </div>
                                                <div className="col-2">
                                                    <p className="title-cart">Giá</p>
                                                </div>
                                                <div className="col-2">
                                                    <p className="title-cart">Thao Tác</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {cartItems.map((item, index) => (
                                        <div className="cart-bottom mt-2" key={index}>
                                            <div className="cart-table">
                                                <div className="cart-item row">
                                                    <div className="col-2">
                                                        <img src={item.images[0]} alt={item.name} style={{ width: '100%' }} />
                                                    </div>
                                                    <div className="col-4 d-flex align-items-center">
                                                        <p className="title-cart">{item.name}</p>
                                                    </div>
                                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                                        <button
                                                            onClick={() => this.handleDecrement(index)}
                                                            className="btn-quantity"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            className="input-quantity"
                                                            type="text"
                                                            value={item.quantity || 1} // Sử dụng quantity từ item
                                                            readOnly
                                                        />
                                                        <button
                                                            onClick={() => this.handleIncrement(index)}
                                                            className="btn-quantity"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="col-2 d-flex align-items-center">
                                                        <p className="title-cart ">{item.price.toLocaleString()} VND</p>
                                                    </div>
                                                    <div className="col-2 d-flex align-items-center">
                                                        <button style={{
                                                            marginLeft: 35,
                                                            backgroundColor: '#FF4C4C',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                            padding: '8px 12px',
                                                        }} onClick={() => { this.handleRemoveItem(index) }}>
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-4">
                                    <div className="cart-summary">
                                        <h5 className="summary-title">Thông Tin Đơn Hàng</h5>
                                        <div className="summary-item">
                                            <p className="summary-label">Số Lượng Sản Phẩm:</p>
                                            <p className="summary-value">{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</p>
                                        </div>
                                        <div className="summary-item">
                                            <p className="summary-label">Tổng số tiền:</p>
                                            <p className="summary-value">{totalAmount.toLocaleString()} VND</p>
                                        </div>
                                        <div className="summary-btn">
                                            <Link
                                                to={{
                                                    pathname: '/pay',
                                                    state: { cartItems }
                                                }}
                                            >
                                                <button className="btn btn-danger btn-block">Đặt Mua Ngay</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
