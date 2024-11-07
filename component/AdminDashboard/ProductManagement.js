import React, { useState, useEffect } from 'react';
import {
  createProduct,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  getAllProducts,
  getCategories,
  getBrands,
} from '../../services/productService'; // Adjust the import based on your file structure
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null); // New state for productId to update
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
      console.log(response);
      
    } catch (error) {
      console.error('Failed to fetch products:', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);

    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response);
    } catch (error) {
      console.error('Failed to fetch brands:', error.message);
    }
  };

  const addProduct = async (productData) => {
    try {
      await createProduct(productData);
      fetchProducts();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add product:', error.message);
      alert(error.message);
    }
  };

  const updateProduct = async (productData) => {
    try {
      await updateProductService(productIdToUpdate, productData);
      fetchProducts();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update product:', error.message);
      alert(error.message);
    }
  };

  const openUpdateForm = (product) => {
    setProductIdToUpdate(product.id);
    setName(product.name);
    setDescription(product.description);
    setCategoryId(product.categoryId);
    setBrandId(product.brandId);
    setPrice(product.price);
    setImages(product.images);
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error.message);
    }
  };

  const resetForm = () => {
    setProductIdToUpdate(null);
    setName('');
    setPrice('');
    setDescription('');
    setCategoryId('');
    setBrandId('');
    setImages([]);
  };

  const handleFormSubmit = (productData) => {
    if (productIdToUpdate) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
  };

  return (
    <div>
      <div className='container-fluid'>
        <div className=''>
          <div className='product'>
            <div className='btn-addproduct d-flex justify-content-start mb-3'>
              <button style={styles.editBtn} onClick={() => setShowModal(true)}>Thêm Sản Phẩm</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Sản Phẩm</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Thể Loại</th>
                  <th scope="col">Thương Hiệu</th>
                  <th scope="col">Mô Tả</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Thao Tác</th>
                </tr>
              </thead>
              {products.length === 0 ? (
                <p style={styles.emptyMessage}>Chưa có sản phẩm nào.</p>
              ) : (
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>
                        <img src={product.images[0]} alt={product.name} style={{ width: 100, height: 100 }} />
                      </td>
                      <td>{product.categoryName}</td>
                      <td>{product.brandName}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <div style={styles.popupButtons}>
                          <button className='mr-2' style={styles.editBtn} onClick={() => openUpdateForm(product)}>Sửa</button>
                          <button style={styles.deleteButton} onClick={() => deleteProduct(product.id)}>Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {showModal && (
          <ProductForm
            onClose={() => setShowModal(false)}
            onAddProduct={handleFormSubmit}
            categories={categories}
            brands={brands}
            name={name}
            description={description}
            categoryId={categoryId}
            brandId={brandId}
            price={price}
            images={images}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  editBtn: {
    backgroundColor: 'rgb(10, 209, 200)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '8px 12px',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '8px 12px',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
  },
};

export default ProductManagement;
