import React, { Component } from 'react'

export default class InfoEditPW extends Component {
    render() {
        return (
            <div>
                <div className='info-pw'>
                    <div className='pw-top'>
                        <div className='pw-top-title'>
                            <h3>Đổi Mật Khẩu</h3>
                            <p>Để bảo mật, vui lòng không chia sẽ cho người khác</p>
                        </div>
                    </div>
                    <div className='pw-bottom ' style={{}}>
                        <form>
                            <table>
                                <tr>
                                    <td>
                                        Mật khẩu mới:
                                    </td>
                                    <td>
                                        <input type='password' placeholder='Nhập mật khẩu' style={{width: '90%',height:40}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Xác nhận mật khẩu
                                    </td>
                                    <td>
                                        <input type='password' placeholder='Xác nhận mật khẩu'style={{width: '90%',height:40}} />
                                    </td>
                                </tr>
                            </table>
                            <div className='btn-save d-flex justify-content-center mt-3'>
                                <button type='submit' className='btn btn-danger'>Lưu</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}
