import React, { Component } from 'react'
import PropTypes from "prop-types"
import Checkbox from "antd/lib/checkbox"
import "antd/lib/checkbox/style/css"
import { babyBody, brand, atom, attention, sundry } from "../../map"

import "./index.css"

/*
组件用法：
从外部接收：option，根据option.map，从map组件中选择对应的map对象，遍历它并生成每一个选项
*/

// 此组件可能用到的map
const map = new Map([
  ["babyBody", babyBody],
  ["brand", brand],
  ["atom", atom],
  ["attention", attention],
  ["sundry", sundry],
])


export default class MyCheckBoxGroup extends Component {

  handleChangeBabyBody = (value) => {
    let item = {};
    console.log(value);
    item[this.props.propName] = value;
    this.props.handleChange(item);
  }

  render() {
    const { option } = this.props
    return(
      <Checkbox.Group className="my-checkbox-group" defaultValue={option.item ? option.item : []} onChange={this.handleChangeBabyBody}>
        {
          (() => {
            let arr = [];
            map.get(option.map).forEach((value, key) => {
              arr.push(<Checkbox className="my-checkbox" value={key} key={key}>{value}</Checkbox>)
            })
            return arr;
          })()

        }
      </Checkbox.Group>
    )
  }
}

MyCheckBoxGroup.propTypes = {
  option: PropTypes.shape({
    map: PropTypes.String, // 表示使用的map结构
    // item 初始是空字符串“”, 或者[]数组
  }),
  propName: PropTypes.string, // 操作的属性名字
  handleChange: PropTypes.func
}
