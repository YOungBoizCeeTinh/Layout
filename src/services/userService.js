import axios from 'axios';
import { getToken } from '../services/localStorageService';

const API_URL = 'http://localhost:8080';

// Hàm để lấy header xác thực
const getAuthHeaders = () => {
    const token = getToken();
    return {
        Authorization: token ? `Bearer ${token}` : undefined,
    };
};

export const createUser = async (userData, imageFile) => {
    try {
        const formData = new FormData();
        if (imageFile) {
            formData.append('imageFile', imageFile); // Đảm bảo tên 'imageFile' khớp với backend
        }
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axios.post(`${API_URL}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders(),
            },
        });

        console.log('Phản hồi từ API sau khi tạo người dùng:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo người dùng:', error);
        throw new Error(error.response?.data?.message || 'Không thể tạo người dùng.');
    }
};

// Hàm lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: getAuthHeaders(),
        });

        console.log('Danh sách người dùng:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        throw new Error(error.message || 'Không thể lấy danh sách người dùng.');
    }
};

// Hàm lấy người dùng theo ID
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: getAuthHeaders(),
        });

        console.log(`Thông tin người dùng với ID ${userId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy người dùng với ID: ${userId}`, error);
        throw new Error(error.message || `Không tìm thấy người dùng với ID: ${userId}`);
    }
};

// Hàm lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/myInfo`, {
            headers: getAuthHeaders(),
        });

        console.log('Thông tin người dùng hiện tại:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng hiện tại:', error);
        throw new Error(error.message || 'Không thể lấy thông tin người dùng hiện tại.');
    }
};

export const updateMyInfo = async (updatedUserData, imageFile) => {
    try {
        const formData = new FormData();
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        formData.append('dob', updatedUserData.dob);
        formData.append('gender', updatedUserData.gender);
        formData.append('numberPhone', updatedUserData.numberPhone);
        formData.append('email', updatedUserData.email);
        
        // Thêm địa chỉ vào formData
        if (updatedUserData.address) {
            formData.append('address', updatedUserData.address);
        }

        const response = await axios.put(`${API_URL}/users/myInfo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders(),
            },
        });

        console.log('Phản hồi từ API sau khi cập nhật thông tin người dùng:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        throw new Error(error.message || 'Không thể cập nhật thông tin người dùng.');
    }
};


// Hàm cập nhật một người dùng theo ID
export const updateUser = async (userId, updatedData, imageFile) => {
    try {
        const formData = new FormData();
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        Object.entries(updatedData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axios.put(`${API_URL}/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders(),
            },
        });

        console.log(`Phản hồi từ API sau khi cập nhật người dùng với ID ${userId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật người dùng với ID: ${userId}`, error);
        throw new Error(error.message || `Không thể cập nhật người dùng với ID: ${userId}`);
    }
};

// Hàm xóa một người dùng theo ID
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: getAuthHeaders(),
        });

        console.log(`Phản hồi từ API sau khi xóa người dùng với ID ${userId}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa người dùng với ID: ${userId}`, error);
        throw new Error(error.message || `Không thể xóa người dùng với ID: ${userId}`);
    }
};

// Hàm cập nhật mật khẩu của người dùng hiện tại
export const updatePasswordMyInfo = async (currentPassword, newPassword, confirmPassword) => {
    // Kiểm tra xem có truyền đủ thông tin không
    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error('Cần nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu.');
    }

    const updatedPasswordData = {
        currentPassword, // Mật khẩu hiện tại
        password: newPassword, // Mật khẩu mới
        confirmPassword // Mật khẩu xác nhận
    };

    try {
        // Gửi yêu cầu PUT đến API để cập nhật mật khẩu
        const response = await axios.put(`${API_URL}/users/password-myInfo`, updatedPasswordData, {
            headers: getAuthHeaders(), // Thêm các header xác thực nếu cần
        });

        // Trả về thông tin kết quả từ phản hồi
        return response.data.result;
    } catch (error) {
        // Xử lý lỗi khi cập nhật mật khẩu
        console.error('Lỗi khi cập nhật mật khẩu người dùng:', error);
        // Truyền thông điệp từ phản hồi lỗi, nếu có
        const errorMessage = error.response?.data?.message || error.message || 'Không thể cập nhật mật khẩu.';
        throw new Error(errorMessage);
    }
};



