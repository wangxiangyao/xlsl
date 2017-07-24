import React, { Component } from 'react'
import PropTypes from "prop-types"
import { skinColor } from "../../../../../map"
import ColorRact from "../../../../ColorRact"
import Icon from "antd/lib/icon"
import "antd/lib/icon/style/css"

import "./index.css"

const colorCode = new Map([
  [0, "#fffaee"],
  [1, "#FBE9D1"],
  [2, "#ECB898"],
  [3, "#B17F64"],
  [4, "#553217"],
])

export default class SkinColorSelect extends Component {

  // TODO:改变肤色
  // 在skin-color-option上添加点击事件

  handleChangeSkinColor = (e) => {
    let item = {
      skin_color: Number(e.target.dataset.index)
    }
    this.props.handleChangeBabyItem(item);
  }

  render() {
    return(
      <div className="skin-color-wrapper">
        {
          (() => {
            let arr = []
            for(let [key, value] of skinColor) {
              // 绑定data-index为此项对应的属性值
              arr.push(
                <div className="skin-color-option" key={key} data-index={key} onClick={this.handleChangeSkinColor}>
                  <div className="skin-color" data-index={key}>
                    <ColorRact color={colorCode.get(key)} data-index={key}></ColorRact>
                  </div>
                  <span className="skin-text" data-index={key}>{value}</span>
                  <Icon data-index={key} type="check" className={`icon-skin ${key === this.props.skinColor ? "" : "hidden"}`}/>
                </div>
              );
            }
            return arr;
          })()
        }
      </div>
    )
  }
}

SkinColorSelect.propTypes = {
  // 没有对skinColor做校验，因为其可能为Null
  handleChangeBabyItem: PropTypes.func
}
