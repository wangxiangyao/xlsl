import fetch from 'isomorphic-fetch';

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

class Order extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
        <div>
          我是订单详情
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    memberId: state.member.id,
    baseUrl: state.fetch.baseUrl,
  }
}

export default connect(mapStateToProps)(Order)
