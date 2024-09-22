import React, { Component } from 'react';
import { getCurrentUser, updateMyInfo } from '../../services/userService';
import '../../asserts/InfoProfile.css';

export default class InfoRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            gender: 'Khác',
            phone: '',
            dob: '',
            username: '',
            email: '',
            address: '',  // Thêm trường địa chỉ vào state
            error: '',
            success: '',
            imageFile: null,
        };
        this.fileInputRef = React.createRef();
    }

    componentDidMount() {
        this.loadUserData();
    }

    loadUserData = async () => {
        try {
            const userData = await getCurrentUser();
            this.setState({
                user: userData.result,
                gender: this.getGenderValue(userData.result.gender),
                phone: userData.result.numberPhone || '',
                dob: userData.result.dob || '',
                username: userData.result.username || '',
                email: userData.result.email || '',
                address: userData.result.address || '',  // Gán giá trị địa chỉ
            });
        } catch (error) {
            this.setState({ error: 'Không thể lấy thông tin người dùng.' });
        }
    };

    getGenderValue = (gender) => {
        switch (gender) {
            case 0: return 'Nam';
            case 1: return 'Nữ';
            default: return 'Khác';
        }
    };

    handleFileUpload = () => {
        this.fileInputRef.current.click();
    };

    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({ imageFile: file });
    };

    handleChange = (field) => (event) => {
        this.setState({ [field]: event.target.value, error: '', success: '' });
    };

    validateInputs = () => {
        const { email, phone } = this.state;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10,15}$/;

        if (!emailPattern.test(email)) {
            return 'Email không hợp lệ.';
        }
        if (!phonePattern.test(phone)) {
            return 'Số điện thoại không hợp lệ.';
        }
        return '';
    };

    handleUpdate = async (event) => {
        event.preventDefault();
        const errorMsg = this.validateInputs();
        if (errorMsg) {
            this.setState({ error: errorMsg });
            return;
        }

        const { dob, gender, phone, email, address, imageFile } = this.state;  // Thêm địa chỉ vào đây
        const updatedUserData = {
            dob,
            gender: this.getGenderNumber(gender),
            numberPhone: phone,
            email,
            address,  // Thêm địa chỉ vào dữ liệu cập nhật
        };

        try {
            const response = await updateMyInfo(updatedUserData, imageFile);
            if (response && response.code === 1000) {
                this.setState({
                    user: response.result,
                    gender: this.getGenderValue(response.result.gender),
                    phone: response.result.numberPhone || '',
                    dob: response.result.dob || '',
                    email: response.result.email || '',
                    address: response.result.address || '',  // Cập nhật địa chỉ từ phản hồi
                    success: 'Cập nhật thông tin thành công!',
                    error: '',
                });
            } else {
                this.setState({ error: response.message || 'Cập nhật không thành công.' });
            }
        } catch (error) {
            this.setState({ error: 'Có lỗi xảy ra khi cập nhật thông tin.' });
        }
    };

    getGenderNumber = (gender) => {
        switch (gender) {
            case 'Nam': return 0;
            case 'Nữ': return 1;
            default: return 0;
        }
    };

    render() {
        const { user, gender, phone, dob, username, email, address, error, success } = this.state;

        if (!user) {
            return <div>Đang tải thông tin người dùng...</div>;
        }

        return (
            <div className="info-container">
                <div className="row">
                    <div className="col-8">
                        <div className="info-right">
                            <div className="right-top">
                                <h3>Hồ Sơ Của Tôi</h3>
                                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            </div>

                            <div className="right-bottom">
                                <form onSubmit={this.handleUpdate}>
                                    <div className="info-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Tên người dùng:</td>
                                                    <td>
                                                        <span>{username}</span>
                                                        <small style={{ color: 'gray' }}> Tên người dùng không thể thay đổi.</small>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Email:</td>
                                                    <td>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={this.handleChange('email')}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Số điện thoại:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={phone}
                                                            onChange={this.handleChange('phone')}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Địa chỉ:</td>  {/* Thêm trường địa chỉ */}
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={address}
                                                            onChange={this.handleChange('address')}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Giới Tính</td>
                                                    <td className="d-flex align-items-center">
                                                        <label className="radio-inline">
                                                            <input
                                                                type="radio"
                                                                value="Nam"
                                                                checked={gender === 'Nam'}
                                                                onChange={this.handleChange('gender')}
                                                            />
                                                            Nam
                                                        </label>
                                                        <label className="radio-inline ml-3">
                                                            <input
                                                                type="radio"
                                                                value="Nữ"
                                                                checked={gender === 'Nữ'}
                                                                onChange={this.handleChange('gender')}
                                                            />
                                                            Nữ
                                                        </label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Ngày sinh:</td>
                                                    <td>
                                                        <input
                                                            type="date"
                                                            value={dob}
                                                            onChange={this.handleChange('dob')}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {error && <p className="error">{error}</p>}
                                    {success && <p className="success">{success}</p>}
                                    <button type="submit" className="btn btn-danger mt-3">Lưu</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="add-img text-center">
                            <img
                                src={require('../../asserts/ProductImg/icon/user2.png')}
                                alt="avatar"
                                className="rounded-circle mb-2"
                                style={{ width: 100, height: 100, border: '2px solid #efefef' }}
                            />
                            <input
                                type="file"
                                ref={this.fileInputRef}
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                onChange={this.handleFileChange}
                            />
                            <button
                                className="btn btn-primary mt-2"
                                onClick={this.handleFileUpload}
                            >
                                Chọn tệp
                            </button>
                            <div className="mt-2 text-muted" style={{ fontSize: '.875rem' }}>
                                Chọn file có định dạng .jpg, .jpeg, .png. Dung lượng tối đa 1MB.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
