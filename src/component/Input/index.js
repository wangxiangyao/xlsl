import React, { Component } from 'react'
import PropTypes from "prop-types"
import Input from "antd/lib/input"
import "antd/lib/input/style/css"
import "./index.css"


export default class MyInput extends Component {

  handleChange = (e) => {
    const { propName } = this.props;
    let item = {};
    let val = e.target.value;
    if (propName !== "name") {
      if (val === "") {
        item[this.props.propName] = "";
      } else {
        item[this.props.propName] = Number(val)
      }
    } else {
      item[this.props.propName] = val;
    }
    // 如果不是name，则转换成数组，以后如果有某些非数组属性，也要写进来

    this.props.onChange(item);
  }

  render() {
    return(
        <Input addonBefore={this.props.addonBefore} placeholder={this.props.placeholder} className="my-input" defaultValue={this.props.item === null ? "" : this.props.item} onBlur={this.handleChange}
          defaultValue={this.props.value}></Input>
    )
  }
}

MyInput.propTypes = {
  propName: PropTypes.string, // 操作的属性名字
  onChange:  PropTypes.func,
  // 为辨识item的类型
}
