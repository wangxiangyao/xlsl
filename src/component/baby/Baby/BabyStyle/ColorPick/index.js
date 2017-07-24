import React, { Component } from 'react'
import PropTypes from "prop-types"
import { colorValue } from "../../../../../map"
import ColorRact from "../../../../ColorRact"
import "../../../../../iconfont/iconfont.css"

import "./index.css"

const color = new Map([
  [6, "红色"],
  [7, "黄色"],
  [5, "紫色"],
  [2, "绿色"],
  [9, "白色"],
  [1, "蓝色"],
  [0, "黑色"],
  [11, "裸色"],
  [3, "灰色"],
  [10, "粉色"],
  [16, "金色"],
  [17, "银色"],
])

export default class ColorPick extends Component {

  like(e) {
    const { item, handleChange } = this.props;
    let key = e.target.dataset.key,
        obj = {
          color: {},
        };

    if (item[key] === 1) {
      obj.color[key] = null;
    } else {
      obj.color[key] = 1;
    }
    handleChange(obj)
  }
  dislike(e) {
    const { item, handleChange } = this.props;
    let key = e.target.dataset.key,
        obj = {
          color: {},
        };

    if (item[key] === 0) {
      obj.color[key] = null;
    } else {
      obj.color[key] = 0;
    }
    handleChange(obj)
  }

  render() {

    const { item } = this.props

    return(
      <div className="color-pick">
        {
          (() => {
            let arr = [];
            color.forEach((value, key) => {
              arr.push(
                <div className="color-pick-item" key={key}>
                  <div className="color-ract-box">
                    <ColorRact color={colorValue.get(key)}></ColorRact>
                  </div>
                  <div className="color-text">
                    {value}
                  </div>
                  <div className="color-action-box">
                    <i className={`color-action icon icon-xihuan ${item && item[key] && item[key] === 1 ? "active" : ""}`} data-key={key} onClick={this.like.bind(this)}></i>
                    <i className={`color-action icon icon-cha-copy ${item && item[key] === 0 ? "active" : ""}`} data-key={key} onClick={this.dislike.bind(this)}></i>
                  </div>
                </div>
              )
            })
            return arr;
          })()
        }
      </div>
    )
  }
}

ColorPick.propTypes = {
  handleChange: PropTypes.func,
  // item 为{}，或者“”
}
