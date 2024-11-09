import React, { Component } from 'react'
import DetailOfProduct from './DetailOfProduct'
import Recomend_Product from './Recomend_Product'
import Comments from './Comments'


export default class Product_Detail extends Component {
  render() {
    return (
      <div className="container-fluid">
      header
        <div className="row">
            <div className="col-2" style={{backgroundColor:'red'}}>1</div>
            <div className="col-8">
                        <DetailOfProduct/>
                        <Comments/>
                        <Recomend_Product/>
                        
            </div>
            <div className="col-2"style={{backgroundColor:'blue'}}>3</div>
        </div>
      </div>
    
    )
  }
}
