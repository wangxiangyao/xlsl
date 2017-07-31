import fetch from 'isomorphic-fetch';

import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import OrderList from "./OrderList";
import NewOrder from "./NewOrder"
import Order from "./Order"
import { fetchIfNeeded, requestOrders, receiveOrders } from '../../actions'

class OrderDump extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchIfNeeded(
      {
        name: "orders",
        path: "/order/",
        config: {
          method: "POST",
        }
      },
      (url, option) => {
        dispatch(requestOrders())
        fetch(url, option)
        .then(
          (res) => {
            if (res.ok) {
              console.log(res)
              return res.json()
            }
          }
        )
        .then(
          (json) => {
            console.log(json)
            dispatch(receiveOrders(json.data.list))
          }
        )
        .catch((e) => console.log(e))
      }
    ))
  }

  render() {
    const { orders } = this.props
    if (orders.isFetching) {
      return (
        <div>正在加载</div>
      )
    }

    return (
        <div>
          <Route exact strict path="/order" render={() => {
            return (<OrderList orders={orders.byId}></OrderList>)
          }}>
          </Route>
          <Route path="/order/:id" render={(props) => {
            let id = props.match.params.id,
                order;
            if (id === 'new') {
              return (
                <NewOrder {...props}/>
              )
            }
            for (let [key, value] of Object.entries(orders.byId)) {

              if (key !== id) {
                continue;
              }
              order = value;
              break;
            }
            return (
              <Order {...props} order={order} id={id} />
            )
          }} />
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    member: state.member,
    baseUrl: state.fetch.baseUrl,
  }
}

export default connect(mapStateToProps)(OrderDump)
