// import React from 'react'
// import { useState, useEffect } from 'react';
// const OrderManagement = () => {
//     const [order, setOrder] = useState([]);
//     const [description, setDescription] = useState('');
//     const [categoryId, setCategoryId] = useState('');
//     const [brandId, setBrandId] = useState(''); // New state for brand // New state for date updated
//     const [images, setImages] = useState([]); // New state for images
//     const [price, setPrice] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]); // New state for brands
//     const [showModal, setShowModal] = useState(false);
//     return (
//         <div>
//           <div className='container-fluid'>
//             <div className=''>
//               <div className='product'>
//                 <div className='btn-addproduct d-flex justify-content-start mb-3'>
//                 <button style={styles.editBtn} onClick={() => setShowModal(true)}>Thêm Sản Phẩm</button>
//                 </div>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">STT</th>
//                       <th scope="col">Sản Phẩm</th>
//                       <th scope="col">Hình ảnh</th>
//                       <th scope="col">Thể Loại</th>
//                       <th scope="col">Thương Hiệu</th>
//                       <th scope="col">Mô Tả</th>
//                       <th scope="col">Giá</th>
//                       <th scope="col">Thao Tác</th>
//                     </tr>
//                   </thead>
//                   {.length === 0 ? (
//                     <p style={styles.emptyMessage}>Chưa có sản phẩm nào.</p>
//                   ) : (
//                     <tbody>
//                       {.map((product, index) => (
//                         <tr key={product.id}>
//                           <th scope="row">{index + 1}</th>
//                           <td>{product.name}</td>
//                           <td>
//                             <img src={product.images[0]} alt={product.name} style={{ width: 100, height: 100 }} />
//                           </td>
//                           <td>{product.categoryName}</td>
//                           <td>{product.brandName}</td>
//                           <td>{product.description}</td>
//                           <td>{product.price}</td>
//                           <td>
//                             <div style={styles.popupButtons}>
//                               <button className='mr-2' style={styles.editBtn} onClick={() => {}}>Sửa</button>
//                               <button style={styles.deleteButton} onClick={() =>deleteProduct(product.id)}>Xóa</button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   )}
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
      
//       )
// };


// const styles = {
//     container: {
//       backgroundColor: '#fff',
//       padding: '20px',
//       borderRadius: '10px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       margin: '20px',
//     },
//     heading: {
//       color: '#14919B',
//       textAlign: 'center',
//       marginBottom: '20px',
//     },
//     formContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '10px',
//     },
//     input: {
//       padding: '10px',
//       border: '1px solid #0AD1C8',
//       borderRadius: '5px',
//       outline: 'none',
//     },
//     textarea: {
//       padding: '10px',
//       border: '1px solid #0AD1C8',
//       borderRadius: '5px',
//       outline: 'none',
//       minHeight: '80px',
//     },
//     select: {
//       padding: '10px',
//       border: '1px solid #0AD1C8',
//       borderRadius: '5px',
//     },
//     button: {
//       padding: '10px',
//       backgroundColor: '#0AD1C8',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
//     editBtn: {
//       backgroundColor: 'rgb(10, 209, 200)',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       padding: '8px 12px',
//     },
//     productList: {
//       listStyleType: 'none',
//       padding: '0',
//       marginTop: '20px',
//     },
//     productItem: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       padding: '10px',
//       borderBottom: '1px solid #ccc',
//     },
//     deleteButton: {
//       backgroundColor: '#FF4C4C',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       padding: '8px 12px',
//     },
//     previewContainer: {
//       marginTop: '20px',
//       borderTop: '1px solid #ddd',
//       paddingTop: '10px',
//     },
//     previewHeading: {
//       color: '#0AD1C8',
//     },
//     emptyMessage: {
//       textAlign: 'center',
//       color: '#999',
//     },
//     productDetails: {
//       flex: '1',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '5px',
//     },
//     modalOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       padding: '20px',
//       borderRadius: '10px',
//       width: '400px',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//   };
//   export default OrderManagement()