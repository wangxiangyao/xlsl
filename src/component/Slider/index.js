import React, { Component } from 'react'
import PropTypes from "prop-types"
import Slider from "antd/lib/slider"
import "antd/lib/slider/style/css"
import "./index.css"


/*
组件用法：

*/

export default class MySlider extends Component {

  onSliderChange(value) {
    const { propName, handleChange } = this.props
    console.log(this.props)
    let obj = {};
    obj[propName] = value
    handleChange(obj);
  }

  render() {

    const { text, item } = this.props
    const config = {
      range: true,
      min: 0,
      max: 1000,
      step: 10,
      marks: {
        100: "100rmb",
        500: "500rmb",
        800: "800rmb",
      },
      defaultValue: item === "" ? [100, 800] : item,
    }
    return(
      <div className="my-slider-wrapper">
        <div className="my-slider-text">{text}</div>
        <Slider {...config} onAfterChange={this.onSliderChange.bind(this)}></Slider>
      </div>
    )
  }
}

MySlider.propTypes = {
  text: PropTypes.string,
  //  item 为""，或者[]
  propName: PropTypes.string, // 操作的属性名字
  handleChange: PropTypes.func,
}
