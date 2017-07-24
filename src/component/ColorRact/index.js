import React, { Component } from 'react'
import PropTypes from "prop-types"


/*
组件用法：
外部传入一个color，可以直接生成颜色块
*/

export default class MyInput extends Component {

  render() {
    return(
      <div {...this.props} className="color-ract" style={{
        height: "20px",
        width: "48px",
        backgroundColor: this.props.color,
        borderRadius: "100px",
        border: `1px solid #dbdbdb`
      }}>

      </div>
    )
  }
}

MyInput.propTypes = {
  color: PropTypes.string.isRequired
}
