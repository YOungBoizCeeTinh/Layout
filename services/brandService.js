import axios from 'axios';
import { setToken, removeToken, getToken } from '../services/localStorageService';
import jwtDecode from 'jwt-decode'; // Xóa dấu } để không gây lỗi

const API_URL = 'http://localhost:8080';

// Tạo instance Axios với cấu hình sẵn
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor thêm token vào headers cho các request nếu có token
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

// Tạo thương hiệu
export const createBrand = async (brandData) => {
    try {
        const response = await apiClient.post('/brand', brandData);
        return  response.data.result;
    } catch (error) {
        const errorMessage = error.response?.message || 'Không thể tạo thương hiệu mới.';
        throw new Error(errorMessage);
    }
};

// Cập nhật thương hiệu
export const updateBrand = async (brandId, updatedData) => {
    try {
        const response = await apiClient.put(`/brand/${brandId}`, updatedData);

        return  response.data.result;
    } catch (error) {
        const errorMessage = error.response?.message || `Không thể cập nhật thương hiệu có ID: ${brandId}`;
        throw new Error(errorMessage);
    }
};

// Lấy tất cả thương hiệu
export const getAllBrands = async () => {
    try {
        const response = await apiClient.get('/brand');
        console.log(response);
        
        return response.data.result;

    } catch (error) {
        const errorMessage = error.response?.message || 'Không thể lấy danh sách thương hiệu.';
        throw new Error(errorMessage);
    }
};

// Xóa thương hiệu
export const deleteBrand = async (brandId) => {
    try {
        const response = await apiClient.delete(`/brand/${brandId}`);
        return  response.data.result;
    } catch (error) {
        const errorMessage = error.response?.message || `Không thể xóa thương hiệu có ID: ${brandId}`;
        throw new Error(errorMessage);
    }
};

