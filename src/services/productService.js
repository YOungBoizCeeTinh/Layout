import axios from 'axios';
import { getToken } from '../services/localStorageService';

const API_URL = 'http://localhost:8080';

// Create Axios instance with default settings
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to headers for all requests if available
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Create product
export const createProduct = async (productData) => {
    try {
        const response = await apiClient.post('/product/create', productData);
        return response.data.result;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể tạo sản phẩm mới.';
        throw new Error(errorMessage);
    }
};

// Update product
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await apiClient.put(`/product/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Không thể cập nhật sản phẩm có ID: ${productId}`;
        throw new Error(errorMessage);
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await apiClient.get('/product');
        return response.data.result;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể lấy danh sách sản phẩm.';
        throw new Error(errorMessage);
    }
};

// Get product by ID
export const getProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Không tìm thấy sản phẩm có ID: ${productId}`;
        throw new Error(errorMessage);
    }
};

// Delete product
export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/product/${productId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Không thể xóa sản phẩm có ID: ${productId}`;
        throw new Error(errorMessage);
    }
};

// Get all categories
export const getCategories = async () => {
    try {
        const response = await apiClient.get('/category'); // Update with your API endpoint
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể lấy danh sách thể loại.';
        throw new Error(errorMessage);
    }
};

// Get all brands
export const getBrands = async () => {
    try {
        const response = await apiClient.get('/brand'); // Update with your API endpoint for brands
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể lấy danh sách thương hiệu.';
        throw new Error(errorMessage);
    }
};
