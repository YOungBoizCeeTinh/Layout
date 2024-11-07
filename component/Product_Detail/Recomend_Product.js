import React, { Component } from 'react';

export default class Recomend_Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, // Index của sản phẩm hiện tại đang bắt đầu
      productsPerPage: 4, // Số sản phẩm hiển thị trên mỗi trang
      recommendedProducts: [
        {
          id: 1,
          title: 'Logitech G502 Hero',
          image: '/assets/product/logitech_g502.png',
          price: '$49.99',
          rating: 4.5,
        },
        {
          id: 2,
          title: 'Corsair K95 RGB',
          image: '/assets/product/corsair_k95.png',
          price: '$199.99',
          rating: 5,
        },
        {
          id: 3,
          title: 'Samsung Odyssey G7',
          image: '/assets/product/samsung_odyssey.png',
          price: '$699.99',
          rating: 4,
        },
        {
          id: 4,
          title: 'Razer DeathAdder V2',
          image: '/assets/product/razer_deathadder.png',
          price: '$69.99',
          rating: 4.8,
        },
        {
          id: 5,
          title: 'ASUS ROG Strix',
          image: '/assets/product/asus_rog_strix.png',
          price: '$799.99',
          rating: 4.7,
        },
        {
          id: 6,
          title: 'MSI Optix MAG272CQR',
          image: '/assets/product/msi_optix.png',
          price: '$349.99',
          rating: 4.6,
        },
        {
          id: 7,
          title: 'Cooler Master SK622',
          image: '/assets/product/cooler_master_sk622.png',
          price: '$99.99',
          rating: 4.3,
        },
        {
          id: 8,
          title: 'SteelSeries Rival 600',
          image: '/assets/product/steelseries_rival_600.png',
          price: '$79.99',
          rating: 4.4,
        },
      ],
    };
  }

  // Hàm xử lý khi nhấn nút sang trái
  handlePrevClick = () => {
    const { currentIndex, productsPerPage } = this.state;
    if (currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - productsPerPage,
      });
    }
  };

  // Hàm xử lý khi nhấn nút sang phải
  handleNextClick = () => {
    const { currentIndex, productsPerPage, recommendedProducts } = this.state;
    if (currentIndex + productsPerPage < recommendedProducts.length) {
      this.setState({
        currentIndex: currentIndex + productsPerPage,
      });
    }
  };

  // Xử lý khi người dùng nhấn vào sản phẩm
  handleProductClick = (product) => {
    alert(`Bạn đã chọn sản phẩm: ${product.title}`);
  };

  // Xử lý thêm sản phẩm vào giỏ hàng
  handleAddToCart = (product) => {
    alert(`Đã thêm ${product.title} vào giỏ hàng.`);
  };

  render() {
    const { recommendedProducts, currentIndex, productsPerPage } = this.state;

    // Lấy các sản phẩm cần hiển thị dựa trên index hiện tại
    const visibleProducts = recommendedProducts.slice(currentIndex, currentIndex + productsPerPage);

    return (
      <div className="container mt-4">
        <h4 className="mb-3">Sản phẩm đề xuất</h4>
        <div className="d-flex justify-content-between align-items-center">
          {/* Nút điều hướng trái */}
          <button
            className="btn btn-outline-secondary"
            onClick={this.handlePrevClick}
            disabled={currentIndex === 0} // Vô hiệu hóa nếu đang ở đầu danh sách
          >
            &lt; Trước
          </button>

          {/* Hiển thị danh sách sản phẩm */}
          <div className="d-flex flex-grow-1 justify-content-between mx-3">
            {visibleProducts.map((product) => (
              <div className="card product-card" key={product.id}>
                <div
                  className="card-body"
                  style={{ cursor: 'pointer', borderRadius: '8px' }}
                  onClick={() => this.handleProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{
                      height: '180px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  />
                  <div className="mt-3">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <p className="text-center" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                      {product.price}
                    </p>
                    <div className="text-center">
                      <span style={{ fontSize: '1.2em', color: '#ffc107' }}>
                        {'★'.repeat(Math.floor(product.rating))}{' '}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </span>
                      <p>({product.rating} sao)</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn không cho sự kiện click thẻ thực hiện
                      this.handleAddToCart(product);
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nút điều hướng phải */}
          <button
            className="btn btn-outline-secondary"
            onClick={this.handleNextClick}
            disabled={currentIndex + productsPerPage >= recommendedProducts.length} // Vô hiệu hóa nếu đến cuối danh sách
          >
            Sau &gt;
          </button>
        </div>

        {/* CSS styling */}
        <style jsx>{`
          .product-card {
            width: 23%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-right: 15px;
          }
          .product-card img {
            border-bottom: 1px solid #ddd;
          }
          .product-card .card-body {
            padding: 15px;
          }
          .product-card .card-footer {
            padding: 10px;
          }
        `}</style>
      </div>
    );
  }
}
