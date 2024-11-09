import React, { Component } from 'react';
import '../../asserts/Header.css';
import { logout, login } from '../../services/authenticationService';
import { getToken } from '../../services/localStorageService';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: "",
      dob: "",
      gender: "",
      address: "",
      numberPhone: "",
    };
  }
  componentDidMount() {
    const accessToken = getToken();

    if (!accessToken) {
      this.navigate("/login");
    } else {
      this.getUserDetails(accessToken);
    }
  }

  navigate = (path) => {
    // Thêm logic điều hướng cho class component
    window.location.href = path;
  };

  handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const requestData = { token };
      await logout(requestData);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      this.setState({ user: null });
      this.navigate('/');

    } catch (error) {
      console.error('Đăng xuất thất bại:', error.message);
    }
  };

  handleLogin = async (credentials) => {
    try {
      const result = await login(credentials);
      this.setState({ user: result.user || { username: credentials.username } });
    } catch (error) {
      throw new Error('Login error:', error);
    }
    try {
      const userData = await login(credentials);
      this.setState({ user: userData.user || { username: credentials.username } });

      if (userData.noPassword) {
        this.navigate('/updateInfoUser');
      } else {
        this.navigate('/');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getUserDetails = async (accessToken) => {
    const response = await fetch("http://localhost:8080/users/myInfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    this.setState({ user: data.result });

    // Kiểm tra trường noPassword để điều hướng
    if (data.result.noPassword) {
      this.navigate('/updateInfoUser'); // Điều hướng đến trang cập nhật thông tin
    }
  };

  showSuccess = (message) => {
    this.setState({ successMessage: message });
  };

  updateInfoUser = (event) => {
    event.preventDefault();

    const { password, dob, gender, address, numberPhone } = this.state;

    const body = {
      password: password,
      dob: dob,
      gender: gender,
      address: address,
      numberPhone: numberPhone
    };

    fetch("http://localhost:8080/users/create/userInfoLoginGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 1000) throw new Error(data.message);

        this.getUserDetails(getToken());
        this.showSuccess(data.message)
      })
      .catch((error) => {
        console.error("Error updating user info:", error.message);
      });
  };


  render() {
    const { user } = this.state;
    return (
      <div>
        <header className='header' >
          <div className='header-background' style={{ height: 108 }}>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-2'>
                  <Link to="/admin">
                    <div className='logo'>
                      <div className='logo-img'>
                        <img src='https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png' style={{ width: '55%', marginTop: 18 }} alt='logo' />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col-2'>
                  <div className='category d-flex'>
                    <div className='category-icon align-items-center d-flex'>
                      <img className='icon' src='https://file.hstatic.net/200000713019/file/category_cc0fade29df84dbdbce905c303557980.png' style={{ width: 30, height: 30 }} alt='san pham' />
                      <span className='title-cate ml-2' style={{ color: 'aliceblue' }}>Sản Phẩm</span >
                    </div>
                    <nav className='nav-group'>
                      <div style={{ position: 'relative' }}>
                        <ul className='navigation list-menu-nav scroll d-flex p-0' style={{ justifyContent: 'space-evenly' }} >
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/laptop-material-svgrepo-com_5b447a528b824e319403189dd194bc7c.svg' alt='icon laptop' />
                            <div className=''>Laptop</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/computer-and-monitor-svgrepo-com_2919cb4adb854d99b0b1ed6153ca24bf.svg' alt='icon laptop' />
                            <div className=''>PC</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/monitor-svgrepo-com_b087a7612e1d416e912b35f314f15d5a.svg' alt='icon laptop' />
                            <div className=''>Màn Hình</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/cpu-chip-01-svgrepo-com_990cdf4bd7784321bd417ccdf307ad8e.svg' alt='icon laptop' />
                            <div className=''>Linh Kiện</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/keyboard-svgrepo-com_168b31415fc24bfc8431a4f2d6df698a.svg' alt='icon laptop' />
                            <div className=''>Gaming Gear</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/backpack-bag-holidays-svgrepo-com_cf9a26a2c3e04a888f813d7c98bd90a9.svg' alt='icon laptop' />
                            <div className=''>Phụ Kiện</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className='nav-item '>
                            <img style={{ width: 40, height: 40 }} src='https://file.hstatic.net/200000837185/file/chair-office-svgrepo-com__1__c53b5e823dd24b3d99f3621545b4ea92.svg' alt='icon laptop' />
                            <div className=''>Bàn/Ghế</div>
                            <div className='submenu'>
                              <div className='submenu-bg'>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                                <ul className='submenu-list'>
                                  <a className='item-link-lv1' href='/'><p className='submenu-title'>Thương Hiệu <i className='float-right fa fa-chevron-right' style={{ marginTop: 6, marginLeft: 3 }} ></i></p></a>
                                  <li className='item-lv1'>
                                    <ul className='submenu-lv2-list'>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                      <li className='item-lv2'>
                                        <a href='/' className='item-link-lv2'>ACER | PREDATOR</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='search'>
                    <form>
                      <div className='search-inner'>
                        <input className='search-input' type='search' placeholder='Bạn Muốn Tìm Gì?' />
                        <button type="button" className=" btn-search"><i className="fa fa-search" style={{ color: 'white' }}></i></button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='cart'>
                        <div className='cart-btn'>
                          <Link to="/cart">
                            <button className='btn-cart d-flex d-flex-center'>
                              <span className='box-icon'>
                                <img style={{ width: 24, height: 24, marginTop: 5 }} src='//theme.hstatic.net/200000837185/1001221874/14/shopping-cart.svg?v=2440' alt='Gio hang' />
                              </span>
                              <span className='box-text visible-lg' style={{ marginTop: 5, marginLeft: 3 }}>
                                <p className='title-cart-header'>Giỏ Hàng</p>
                              </span>
                            </button>
                          </Link>

                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex justify-content-center' style={{ width: '100%', height: 108 }}>
                      <div className='Login d-flex d-flex-center'>
                        {user ? (
                          <div className='d-flex user-logged-in pt-3'>
                            <Link to='/info'>
                              <span className='box-text visible-lg d-flex'>
                                <img
                                  src={user.avatar || 'https://theme.hstatic.net/200000837185/1001221874/14/user-account.svg?v=2440'}
                                  alt="Avatar"
                                  style={{ width: 20, height: 20 }}
                                />
                                <p className='title-login username' style={{ fontFamily: 'Merriweather,serif', fontSize: '1rem' }}>Chào, {user.username}</p>
                              </span>
                            </Link>
                            <button onClick={this.handleLogout} className='btn-login d-flex d-flex-center' type='submit'>
                              <span className='box-text visible-lg' style={{ color: 'red' }}>
                                Đăng Xuất
                              </span>
                            </button>
                          </div>
                        ) : (
                          <Link to="/login">
                            <div>
                              <button className='btn-login d-flex d-flex-center' type='submit' style={{ paddingTop: 34 }}>
                                <span className='box-icon'>
                                  <img style={{ width: 24, height: 24, marginTop: 5 }} src='https://theme.hstatic.net/200000837185/1001221874/14/user-account.svg?v=2440' alt='Ảnh đại diện' />
                                </span>
                                <span className='box-text visible-lg' >
                                  <p className='title-login mt-1'>Đăng Nhập</p>
                                </span>
                              </button>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
