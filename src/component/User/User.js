import React, { Component } from 'react'
import axios from 'axios';
import Header from '../Home/Header';
import Slide from '../Slide/Slide'
import Body from '../Home/Body';
import Footer from '../Home/Footer'
import DetailOfProduct from '../Product_Detail/DetailOfProduct';
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null, // State để lưu sản phẩm được chọn
      error: null,
    };
  }

  async componentDidMount() {
    await this.fetchProduct();
  }

  async fetchProduct() {
    try {
      let response = await axios.get('http://localhost:8080/product');
      this.setState({ products: response.data.result });
      
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Hàm xử lý chọn sản phẩm
  handleProductSelect = (product) => {
    this.setState({ selectedProduct: product });
  };
  render() {
    const { products, error, selectedProduct } = this.state;
    console.log(products)
    return (
      <div>
        <Header />
        <Slide />
        <Body
          products={products}
          error={error}
          onSelectProduct={this.handleProductSelect} // Truyền hàm xử lý chọn sản phẩm
        />
        {selectedProduct && (
          <DetailOfProduct product={selectedProduct} /> // Truyền sản phẩm đã chọn qua props
        )}
        <Footer />
      </div>
    )
  }
}
