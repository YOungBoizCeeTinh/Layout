import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../asserts/Body.css';
import Pagination from '../Pagination/Pagination';
import SidebarFilter from './SidebarFilter';

const Body = ({ error }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    maxPrice: ''
  });

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product');
      setProducts(response.data.result);  // Lấy tất cả sản phẩm
    } catch (error) {
      console.error("Lỗi khi xuất sản phẩm:", error);
    }
  };

  const fetchFilteredProducts = async (filters) => {
    try {
      const response = await axios.get('http://localhost:8080/product/search', {
        params: {
          categoryName: filters.category,
          brandName: filters.brand,
          price: filters.maxPrice ? parseFloat(filters.maxPrice) : null,
        }
      });
      setProducts(response.data.result);
    } catch (error) {
      console.error("Lỗi khi xuất sản phẩm:", error);
    }
  };


  useEffect(() => {
    fetchAllProducts();  // Lấy tất cả sản phẩm khi trang được tải lần đầu
  }, []);

  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    navigate(`/detail/${product.id}`, { state: { product } });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);  // Cập nhật điều kiện lọc và trang hiện tại về 1
    setCurrentPage(1);
    fetchFilteredProducts(newFilters);  // Gọi API lọc sản phẩm
  };

  const handleResetFilters = () => {
    setFilters({ category: '', brand: '', maxPrice: '' });  // Reset điều kiện lọc
    setCurrentPage(1);
    fetchAllProducts();  // Lấy lại tất cả sản phẩm
  };

  return (
    <div>
      <div className='d-flex'>
        <div className="sidebar" style={{ width: '20%', padding: '20px' }}>
          <SidebarFilter onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
        </div>
        <div className='container mt-3'>
          <div className='product-list'>
            <div className='product-title d-flex'>
              <h1>Best Sale</h1>
            </div>
            <div className='row mt-1 d-flex'>
              {error && <p>Error: {error}</p>}
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div className='col-3 mt-3' key={product.id}>
                    <div className='product-item' onClick={() => handleProductClick(product)}>
                      <div className="card">
                        <img className="card-img-top" src={product.images[0]} alt={product.name} style={{ height: 200 }} />
                        <div className="card-body">
                          <h4 className="card-title">{product.name}</h4>
                          <p className="card-text">Giá: {product.price}</p>
                          {/* Các thông tin phụ của sản phẩm */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm</p>
              )}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
