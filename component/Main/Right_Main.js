import React, { Component } from 'react';

export default class Right_Main extends Component {
  renderBlogs() {
    const techBlogs = [
      { title: 'Understanding React Components', author: 'John Doe', date: 'Sep 25, 2024' },
      { title: 'Introduction to AI and Machine Learning', author: 'Jane Smith', date: 'Oct 1, 2024' },
      { title: 'Building Scalable Web Apps', author: 'David Brown', date: 'Aug 30, 2024' },
    ];

    return techBlogs.map((blog, index) => (
      <div className="blog-item" key={index} style={blogItemStyle}>
        <h5 style={blogTitleStyle}>{blog.title}</h5>
        <p style={blogAuthorStyle}>By {blog.author}</p>
        <p style={blogDateStyle}>{blog.date}</p>
      </div>
    ));
  }

  render() {
    return (
      <div  style={rightMainStyle}>
        <h4 style={blogSectionTitleStyle}>Tech Blogs</h4>
        {this.renderBlogs()}
      </div>
    );
  }
}

// CSS-in-JS styles for consistent UI
const rightMainStyle = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderLeft: '1px solid #dee2e6',
  height: '100%',
  textAlign: 'left',
};

const blogSectionTitleStyle = {
  color: '#343a40',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const blogItemStyle = {
  backgroundColor: '#ffffff',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const blogTitleStyle = {
  color: '#dc3545',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const blogAuthorStyle = {
  color: '#6c757d',
  fontSize: '14px',
  marginBottom: '5px',
};

const blogDateStyle = {
  color: '#6c757d',
  fontSize: '12px',
};

// Adding hover effect
const hoverEffect = {
  ':hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  },
};
