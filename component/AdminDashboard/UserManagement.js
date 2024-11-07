import React, { useState, useEffect } from 'react';
import { createUser, deleteUser as deleteUserService, getAllUsers, updateUser } from '../../services/userService';
import UserForm from './UserForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Ensure users is initialized as an array
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { result } = await getAllUsers();
      // Ensure result is an array
      setUsers(Array.isArray(result) ? result : []);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Không thể tải người dùng: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    try {
      await createUser(userData);
      await fetchUsers();
      setShowModal(false);
    } catch (error) {
      setErrorMessage('Thêm người dùng thất bại: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (userData) => {
    setLoading(true);
    try {
      await updateUser(userData.id, userData);
      await fetchUsers();
      setShowModal(false);
      setEditingUser(null);
    } catch (error) {
      setErrorMessage('Cập nhật người dùng thất bại: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setLoading(true);
      try {
        await deleteUserService(id);
        await fetchUsers();
      } catch (error) {
        setErrorMessage('Không thể xóa người dùng: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Quản Lý Người Dùng</h2>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      {loading && <div style={styles.loading}>Đang tải...</div>}
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => { setEditingUser(null); setShowModal(true); }}>
          Thêm Người Dùng
        </button>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Tên Đăng Nhập</th>
              <th scope='col'>Email</th>
              <th scope='col'>Giới Tính</th>
              <th scope='col'>Địa Chỉ</th>
              <th scope='col'>Số Điện Thoại</th>
              <th scope='col'>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.emptyMessage}>Chưa có người dùng nào.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === 0 ? 'Nam' : 'Nữ'}</td>
                  <td>{user.address}</td>
                  <td>{user.numberPhone}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)} style={styles.editButton}>
                      Sửa
                    </button>
                    <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <UserForm
          onClose={() => setShowModal(false)}
          onAddUser={addUser}
          onEditUser={editingUser ? editUser : null}
          editingUser={editingUser}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#0AD1C8',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonContainer: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#14919B',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  tableContainer: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loading: {
    color: '#0AD1C8',
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
  },
};

export default UserManagement;
