import React, { Component } from 'react';

export default class Top_Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {
        title: 'NVIDIA GeForce RTX 3080',
        description: 'RTX 3080',
        image: '/assets/product/rtx_3080.png', // Đường dẫn hình ảnh sản phẩm
      },
    };
  }

  handleProductClick = (product) => {
    this.setState({ selectedProduct: product });
  };

  render() {
    const { selectedProduct } = this.state;

    // Dữ liệu các sản phẩm
    const products = [
      {
        title: 'NVIDIA GeForce RTX 3080',
        description: 'RTX 3080',
        image: '/assets/product/rtx_3080.png',
      },
      {
        title: 'NVIDIA GeForce RTX 3090',
        description: 'RTX 3090',
        image: '/assets/product/rtx_3090.png',
      },
      {
        title: 'NVIDIA GeForce RTX 3070',
        description: 'RTX 3070',
        image: '/assets/product/rtx_3070.png',
      },
    ];

    return (
      <div className="container-fluid" style={{ padding: '20px' }}>
        {/* Hàng cho logo */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center">
            <a href="#">
              <img style={{ maxWidth: '100%', height: 'auto' }} src="/assets/img/logo_gear.png" alt="Logo" />
            </a>
          </div>
        </div>

        {/* Hàng cho sản phẩm đã chọn */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card text-left" style={{ border: '2px solid #000', borderRadius: '5px' }}>
              <div className="row g-0">
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img
                    className="card-img-top"
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    style={{ maxWidth: '100%', height: 'auto', padding: '5px' }}
                  />
                </div>
                <div className="col-md-7 card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title">{selectedProduct.title}</h4>
                  <p className="card-text">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hàng cho danh sách sản phẩm */}
        <div className="row">
          {products.map((product, index) => (
            <div
              key={index}
              className="col-12 col-md-4 mb-3"
            >
              <div
                className="card text-left"
                style={{
                  border: '2px solid #000',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex', // Sử dụng flex để dễ dàng điều chỉnh kích thước
                  flexDirection: 'column', // Căn chỉnh theo chiều dọc
                  height: '100%', // Chiều cao thẻ card chiếm toàn bộ không gian
                }}
                onClick={() => this.handleProductClick(product)} // Khi nhấn, sản phẩm sẽ được chọn
              >
                <div className="row g-0" style={{ flex: '1' }}> {/* Dùng flex để chiếm toàn bộ chiều cao */}
                  <div className="col-5 d-flex justify-content-center align-items-center">
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.title}
                      style={{ maxWidth: '100%', height: 'auto', padding: '5px' }}
                    />
                  </div>
                  <div className="col-7 card-body d-flex flex-column justify-content-between">
                    <h4 className="card-title">{product.title}</h4>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
