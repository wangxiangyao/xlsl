import React, { Component } from 'react'
import PropTypes from "prop-types"
import Icon from "antd/lib/icon"
import "antd/lib/icon/style/css"
import "./index.css"


export default class BarTop extends Component {

  // 点击返回按钮，撤回
  back() {
    window.history.back();
  }

  render() {
    return(
      <div className="bar-top-wrapper">
        <div className="bar-top-left" onClick={this.back.bind(this)}>
          <Icon type="left" className="back"></Icon>
          <span>返回</span>
        </div>
        <div className="bar-top-text">{this.props.text}</div>
        <div className="bar-top-right">{this.props.children}</div>
      </div>
    )
  }
}

BarTop.defaultProps = {
  text: "我是标题",
}

BarTop.propTypes = {
  text: PropTypes.string.isRequired
}
