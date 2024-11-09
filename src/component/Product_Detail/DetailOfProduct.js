import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Home/Header';
import { Link } from 'react-router-dom';
import Review from '../Product_Detail/Review';
import Comments from '../Product_Detail/Comments';
import axios from 'axios';
const DetailOfProduct = () => {
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');

  useEffect(() => {
    console.log('Product details:', product);
    if (!product) {
      console.error('Product not found in state');
    }
  }, [product]);
  useEffect(() => {
    console.log('Product details:', product);
    if (!product) {
      console.error('Product not found in state');
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [product]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  //thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!product) {
        alert("Sản phẩm không hợp lệ!");
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        const cartItem = { ...product, quantity };
        cartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
};

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleIncrease = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrease = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

  return (
    <div>
      <Header />
      <div className="container-fluid p-1" style={{ backgroundColor: '#f8f9fa' }}>
        <div className='container'>
          <div style={{ marginTop: 120 }} >
            <div className='return d-flex'>
              <Link to="/">
                <p style={{ fontSize: 18, marginBottom: 10 }}>Trở Lại</p>
              </Link>
            </div>
            <div className="row mt-2">
              {/* Main Product Image */}
              <div className="col-md-7">
                <div className="row">
                  <div className="col-12">
                    <img
                      src={selectedImage}
                      alt="Main product"
                      style={{ width: '100%', height: 500, borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                {/* Thumbnail Images */}
                <div className='row mt-2'>
                  <div className="ml-3 d-flex">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => handleImageClick(image)}
                        style={{
                          width: 100,
                          height: 100,
                          cursor: 'pointer',
                          borderRadius: '8px',
                          border: selectedImage === image ? '2px solid #dc3545' : '1px solid #ddd',
                          margin: '5px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Product Information */}
              <div className="col-md-5">
                <h4 style={{ color: '#212529', textAlign: 'start' }}>{product.name}</h4>
                <div className='product-content align-items-center d-flex'>
                  <span style={{ color: '#495057' }}>{product.reviews} reviews</span>
                  <span className='line-info ml-3 mr-3'>|</span>
                  <span style={{ fontSize: '1.2em', color: '#ffc107' }}>
                    {'★'.repeat(Math.floor(product.rating))}{' '}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className='line-info ml-3 mr-3'>|</span>
                  <span>Lượt mua: </span>
                  <strong>{product.purchases}</strong>
                </div>
                {/* Brand and Category */}
                <div className='d-flex product-info'>
                  <div className='pro-brand'>
                    <span>Thương Hiệu: {product.brandName}</span>
                  </div>
                  <span className='line-info ml-3 mr-3'>|</span>
                  <div className='pro-type'>
                    <span>Loại: {product.categoryName}</span>
                  </div>
                </div>
                {/* Price and Quantity Selector */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 style={{ color: '#dc3545', fontWeight: 'bold' }}>{product.price}</h4>
                </div>
                <div className='col-xs-12 selector-actions d-flex align-items-center'>
                  <div className='quantity-area d-flex align-items-center'>
                    <button onClick={handleDecrease} style={{ width: 40, height: 40, border: '1px solid #ccc', backgroundColor: '#fff' }}>
                      <strong>-</strong>
                    </button>
                    <div className="input-quantity d-flex">
                      <input
                        style={{ border: '1px solid #ccc', textAlign: 'center', width: 40, height: 40 }}
                        type="text"
                        value={quantity}
                        readOnly
                      />
                    </div>
                    <button onClick={handleIncrease} style={{ width: 40, height: 40, border: '1px solid #ccc', backgroundColor: '#fff' }}>
                      <strong>+</strong>
                    </button>
                  </div>
                </div>
                {/* Promo and Buttons */}
                <div className="mb-3 mt-5">
                  <div className='pproduct-promo'>
                    <div className='pproduct-promo-title'>
                      <p className='promo-title' style={{ textAlign: 'start' }}>Chọn ưu đãi:</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary btn-lg w-100" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>Mua Ngay</button>
                  <button className="btn btn-outline-danger btn-lg w-100 mt-2" onClick={()=>{handleAddToCart()}}>Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>
            {/* Additional Details */}
            <div className="row mt-5">
              <div className="col-8">
                <div className='contents'>
                  <div className='title-head-tab'><h4>Mô Tả Chi Tiết</h4></div>
                  <div className='product-description-tab'>
                    <ul className='p-0'>
                      <li><strong>Hiệu Năng:</strong> Intel Core i5-12450H với hiệu năng vận hành ấn tượng.</li>
                      <li><strong>Thiết kế:</strong> Tối giản, lịch lãm với khung máy cứng cáp.</li>
                      <li><strong>Màn hình:</strong> 15.6 inch, Full HD trên tấm nền IPS hiện đại.</li>
                      <li><strong>Thời lượng pin:</strong> 54Whrs.</li>
                      <li><strong>Bàn phím:</strong> Đèn LED, tùy chỉnh màu sắc cho mỗi phím.</li>
                      <li><strong>Giá cả:</strong> 19,290,000₫.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-4'>
                <div className='table-content'>
                  <div className='table-title'><h4>Thông Số Kỹ Thuật</h4></div>
                  <table className='table table-bordered'>
                    <tbody>
                      <tr><th>Thương hiệu</th><td>NVIDIA</td></tr>
                      <tr><th>Chipset</th><td>GeForce RTX 3080</td></tr>
                      <tr><th>Dung lượng bộ nhớ</th><td>10GB GDDR6X</td></tr>
                      <tr><th>Tốc độ bộ nhớ</th><td>19 Gbps</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Review />
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOfProduct;
