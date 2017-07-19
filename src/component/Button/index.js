import React, { Component } from 'react'
import Button from "antd/lib/button";
import "antd/lib/button/style/css"
import "./button.css"


// 根据请求url后的babyId字段，判断自身为修改/新建
/*
font-size,padding需要从外部传入
*/
export default class MyButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="button-wrapper">
        <Button className="my-button" {...this.props}>{this.props.children}</Button>
      </div>

    )
  }
}
