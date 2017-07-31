import React, { Component } from 'react'
import PropTypes from "prop-types";
import Title from "../../../Title";
import {Link} from "react-router-dom";
import Icon from "antd/lib/icon"
import "antd/lib/icon/style/css"
import Button from "../../../Button"
import { connect } from 'react-redux'

import "./index.css"

class OrderAddress extends Component {

  render() {
    const {member} = this.props
    console.log(this.props)
    // if (!addresses) {
    //   return (
    //     <div>
    //       正在加载
    //     </div>
    //   )
    // }
    let addresses = this.props.addresses.byId
    let address = addresses[member.defaultAddress]

    return (
      <div className="order-address-wrapper">
        <Title text="收货信息">
          <div className="new-address">
            <Link className="item" to="/address/new">新增收货地址 <Icon className="item" type="right" /></Link>
          </div>
        </Title>
        <div className="order-address">
          <div className="name">{address.name}</div>
          <div className="phone">收件电话：{address.phone}</div>
          <div className="position">收件地址：{address.province} {address.city} {address.district}</div>
          <div className="addr">详细地址：{address.addr}</div>
        </div>
        <div className="order-address-action">
          <Button style={{
            height:"60px",
            fontSize: "24px",
          }}>编辑地址</Button>
          <Button style={{
            height:"60px",
            fontSize: "24px",
          }}>换个地址</Button>
        </div>
      </div>
    )
  }
}

OrderAddress.PropTypes = {
}

function mapStateToProps(state) {
  return {
    addresses: state.addresses,
    member: state.member,
  }
}

export default connect(mapStateToProps)(OrderAddress)
