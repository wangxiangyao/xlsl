import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Icon } from "antd"

import Gap from "../../../Gap"

import "./index.css"

export default class OrderBox extends Component{

  render() {

    const { order } = this.props

    return (
      <div className="orderbox-wrapper">
        <Gap />
        <div className="orderbox">
          <div className="main">
            <div className="title">{order.baby.name}的小衣盒</div>
            <div className="action">
              <Link className="action-btn" to={`/order/${order.id}`}>{order.status === 1 ? "编辑" : "详情"} <Icon className="item" type="right" /></Link></div>
          </div>
        </div>
      </div>
    )
  }
}

OrderBox.PropTypes = {
  order: PropTypes.object,
}
