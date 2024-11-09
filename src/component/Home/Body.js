import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../asserts/Body.css';
import Pagination from '../Pagination/Pagination';

const Body = ({ products, error }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Số sản phẩm mỗi trang

  // Tính toán chỉ số sản phẩm bắt đầu và kết thúc cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage); // Tổng số trang

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi thay đổi trang
  };

  const handleProductClick = (product) => {
    console.log('Selected product:', product); // Kiểm tra sản phẩm được chọn
    navigate(`/detail/${product.id}`, { state: { product } });
  };
  return (
    <div>
      <div className='container mt-3'>
        <div className='product-list'>
          <div className='product-title d-flex'>
            <h1>Best Sale</h1>
          </div>
          <div className='row mt-1 d-flex'>
            {error && <p>Error: {error}</p>}
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div className='col-3 mt-3' key={product.id}>
                  <div className='product-item' onClick={() => handleProductClick(product)}>
                    <div className="card">
                      <img className="card-img-top" src={product.images[0]} alt={product.name} style={{ height: 200 }} />
                      <div className="card-body">
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">Giá: {product.price}</p>
                        <div className='cart-accessory'>
                          <div className='d-flex justify-content-around'>
                            <div className='d-flex justify-content-between'>
                              <img style={{ width: 15, height: 15 }} src='https://theme.hstatic.net/200000837185/1001221874/14/config_tags_image_1_icon.png?v=2475' alt='' />
                              <span>{product.chip}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                              <img style={{ width: 15, height: 15 }} src='https://theme.hstatic.net/200000837185/1001221874/14/config_tags_image_4_icon.png?v=2475' alt='' />
                              <span>{product.card}</span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-around'>
                            <div className='d-flex justify-content-between'>
                              <img style={{ width: 15, height: 15 }} src='https://theme.hstatic.net/200000837185/1001221874/14/config_tags_image_5_icon.png?v=2475' alt='' />
                              <span>{product.ram}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                              <img style={{ width: 15, height: 15 }} src='https://theme.hstatic.net/200000837185/1001221874/14/config_tags_image_2_icon.png?v=2475' alt='' />
                              <span>{product.screen}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Body;
