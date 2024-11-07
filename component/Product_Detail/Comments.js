import React, { Component } from 'react'
import '../../asserts/Comment.css'
export default class Comments extends Component {
  render() {
    return (
      <div>
        <div className='product-review mt-4'>
          <div className='product-review-head'>
            <div className='mt-2'>
              "Có <span>11</span> <strong>Laptop Gaming MSI Stealth 16 Mercedes AMG Motorsport A1VGG 293VN Ultra 9 185H/32GB/2TB/16QHD 240Hz/RTX4070 8GB/Win11</strong>"
            </div>
          </div>
          <div className='product-reviews-list'>
            <div className='review-bigpen mt-4'>
              <div className='review-bigpen-head'>
                <div className='hrv-product-reviews-author'>
                <span className=''>
                <img style={{ width: 20, height: 20,borderRadius:'50%' }} src={require('../../asserts/ProductImg/chinhan2.jpg')} alt='jansj' />
                <cite className='ml-1'>TheVillain</cite>
                </span>
                </div>
              </div>
              <div className='rowbigen'>
                <p itemProp='description' className='ml-2'>Giao hàng nhanh khi đặt hàng </p>
                <time>27/05/2024 14:01:46</time>
                <div className='mt-2 ml-3'>
                <span><a href='#'>Hữu ích?</a></span>
                <span className='ml-3'><a href='#'>Phản Hồi</a></span>
                </div>
              </div>
              <div className='bigen-reply'>
              <div className='hrv-product-reviews-author'>
                <div className='hrv-product-reviews-author-reply'>
                <span>
                <img style={{ width: 20, height: 20,borderRadius:'50%' }} src={require('../../asserts/ProductImg/chinhan2.jpg')} />
                <cite className='ml-1'>21B4 Shop</cite>
                <span className='ml-2'style={{fontSize:13}}>Đã phản hồi</span>
                </span>
                <p itemProp='description' className='ml-2'>Cảm ơn bạn đã ủng hộ shop 21B4 </p>
                <time>28/05/2024 1:01:46</time>
                <div className='mt-2 ml-3'>
                <span><a href='#'>Hữu ích?</a></span>
                <span className='ml-3'><a href='#'>Phản Hồi</a></span>
                </div>

                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
