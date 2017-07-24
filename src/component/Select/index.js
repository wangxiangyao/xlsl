import React, { Component } from 'react'
import PropTypes from "prop-types"
import Select from "antd/lib/select"
import "antd/lib/select/style/css"
import "./index.css"
import { sex, expect, suit } from "../../map"

const Option = Select.Option

/*
组件用法：
从外部传入：option，根据option.map，从map组件中拿出对应的map
*/


/* 可能使用到的map结构：
1.性别map
*/
const map = new Map([
  ["sex", sex],
  ["expect", expect],
  ["suit", suit],
])


export default class MySelect extends Component {

  handleSelect = (value) => {
    let item = {};
    if (value === '') {
      item[this.props.option.map] = "";
      this.props.onSelect(item);
      return;
    }
    item[this.props.option.map] = Number(value);
    this.props.onSelect(item);
  }

  render() {
    const { option } = this.props
    return(
      <div className="my-select-wrapper">
        <div className="text">{this.props.text}</div>
        <Select onSelect={this.handleSelect} className="select" defaultValue={`${option.item}`}>
          {
            (() => {
              let arr = [];
              arr.push(
                <Option key={-1}>请选择</Option>
              )
              map.get(option.map).forEach((value, key) => {
                arr.push(
                  <Option key={key}>{value}</Option>
                )
              })
              return arr;
            })()
          }
        </Select>
      </div>
    )
  }
}

MySelect.defaultProps = {
  text: "性别",
  option: {
    map: "sex",
    item: 0,
  }
}

// 未指定option.item的类型
MySelect.propTypes = {
  text: PropTypes.string,
  option: PropTypes.shape({
    map: PropTypes.string,
  }),
  propName: PropTypes.string, // 操作的属性名字
  onSelect: PropTypes.func
}
