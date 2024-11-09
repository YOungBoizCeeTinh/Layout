import axios from 'axios';
import { getToken } from '../services/localStorageService';

const API_URL = 'http://localhost:8080'; // URL API của bạn

// Tạo instance Axios với cấu hình sẵn
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm token vào headers cho tất cả yêu cầu nếu có token
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

// Tạo danh mục
export const createCategory = async (categoryData) => {
    try {
        const response = await apiClient.post('/category/add', categoryData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể tạo danh mục mới.';
        throw new Error(errorMessage);
    }
};

// Cập nhật danh mục
export const updateCategory = async (categoryId, updatedData) => {
    try {
        const response = await apiClient.put(`/category/${categoryId}`, updatedData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Không thể cập nhật danh mục có ID: ${categoryId}`;
        throw new Error(errorMessage);
    }
};

// Lấy tất cả danh mục
export const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/category');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể lấy danh sách danh mục.';
        throw new Error(errorMessage);
    }
};

// Xóa danh mục
export const deleteCategory = async (categoryId) => {
    try {
        const response = await apiClient.delete(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || `Không thể xóa danh mục có ID: ${categoryId}`;
        throw new Error(errorMessage);
    }

};
