import React, { Component } from 'react';

export default class Left_Main extends Component {
  renderRecommendations() {
    const recommendedProducts = [
      { title: 'Product 1', price: '$50' },
      { title: 'Product 2', price: '$75' },
      { title: 'Product 3', price: '$100' },
    ];

    return recommendedProducts.map((product, index) => (
      <div className="recommendation-item" key={index} style={recommendationItemStyle}>
        <h5 style={productTitleStyle}>{product.title}</h5>
        <p style={productPriceStyle}>{product.price}</p>
      </div>
    ));
  }

  render() {
    return (
      <div  style={leftMainStyle}>
        <h4 style={recommendationTitleStyle}>Recommended</h4>
        {this.renderRecommendations()}
      </div>
    );
  }
}

// CSS-in-JS styles for consistent UI
const leftMainStyle = {
  backgroundColor: '#f8f9fa',
  padding: '10px',
  borderRight: '1px solid #dee2e6',
  height: '100%',
  textAlign: 'center',
};

const recommendationTitleStyle = {
  color: '#dc3545',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const recommendationItemStyle = {
  backgroundColor: '#ffffff',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const productTitleStyle = {
  color: '#343a40',
  fontSize: '14px',
};

const productPriceStyle = {
  color: '#28a745',
  fontWeight: 'bold',
};

// Add hover effect
const hoverEffect = {
  ':hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  },
};
