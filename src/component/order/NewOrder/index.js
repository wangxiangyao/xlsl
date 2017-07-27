import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { fetchData } from '../../../actions'

import Gap from "../../Gap"
import OrderBabyBox from "./OrderBabyBox"
import Input from "antd/lib/input"
import "antd/lib/input/style/css"
import OrderAddress from "./OrderAddress"
import Title from "../../Title"
import Button from "../../Button"

import "./index.css"
import TimePicker from "../../TimePicker"

const { TextArea } = Input;

class NewOrder extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    const { member } = this.props


    // TODO: 在不是会员的时候，要维护一个支付方式码：0 为没选，1为支付宝，2为微信
    this.state = {
      order: {
        member_id: member.id,
        expect_day: "",
        babies: [],
        message: "",
        address_id: member.defaultAddress,
      }
    }
  }

  handleChangeOrderBaby(id) {
    const { order } = this.state
    let baby = order.babies.slice(0)
    let index = baby.indexOf(id);
    if (index > -1) {
      baby.splice(index, 1)
    } else {
      baby.push(id)
    }
    this.setState({
      order: {
        ...order,
        babies: baby,
      }
    })
  }

  handleCreateOrder() {
    const { dispatch, history } = this.props;
    const { order } = this.state
    dispatch(
      fetchData(
          {
            path: "/order/create",
            config: {
              method: "POST",
              body: JSON.stringify(order),
            }
          },
          (url, option) => {
            console.log(option)
            fetch(url, option)
            .then((res) => {
              if (res.ok) {
                return res.json()
              }
            })
            .then((json) => {
              console.log(json, order)
              // dispatch(addBaby(id, baby))
              history.push("/order")
            })
            .catch((e) => {
              console.log(e);
            })
          }
        )
      )
  }

  handleChangeOrderDay(date) {
    const { order } = this.state
    console.log(date, +new Date(date.format()));
    this.setState({
      order: {
        ...order,
        expect_day: +new Date(date.format()),
      }
    })
  }
  handleChangeOrderMessage(e) {
    console.log(e)
  }


  render() {

    const { babies, member } = this.props
    const { order } = this.state

    console.log(moment(member.join_time).format("YYYY年MM月DD日"))

    return (
      <div className="new-order">
        <div className="new-order-top">
          快来为宝贝预定TA专属的小衣盒吧！
        </div>
        <Gap />
        <OrderBabyBox
          babies={babies.byId}
          orderBaby={order.babies}
          handleChangeOrderBaby={this.handleChangeOrderBaby.bind(this)}>
        </OrderBabyBox>
        <Gap/>
        <TimePicker
          handleChangeOrderDay={this.handleChangeOrderDay.bind(this)}
          joinTime={member.join_time}
          ></TimePicker>
        <Gap />
        <TextArea onBlur={this.handleChangeOrderMessage.bind(this)}
          style={{
            height: "135px",
            fontSize: "14px",
          }}
          placeholder="如果有任何特殊需求（乐器考级，宝贝生日，毕业典礼等）可以在这里留言哦~"></TextArea>
        <Gap />
        <OrderAddress></OrderAddress>
        <Gap />
        <Title text="小鹿森林会员" style={{
          color: "#3fc8cf",
          fontWeight: 600,
          fontSize: "14px",
        }} />
        {
          (() => {
            if (member.isVip) {
              return (
                <div className="vip-wrapper">
                  <div className="vip-title">您是小鹿森林会员，享受免费寄送服务！</div>
                  <div className="vip-text">会员有效期至：{moment(member.join_time ).add(1, "y").format("YYYY年MM月DD日")}</div>
                </div>
              )
            }
          })()
        }
        {
          (() => {
            if (member.isVip) {
              return (
                <Button
                  style={{fontSize: "18px", padding: "11px"}}
                  onClick={this.handleCreateOrder.bind(this)}>
                  立即预定
                </Button>
              )
            }
          })()
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    babies: state.babies,
    member: state.member,
    baseUrl: state.fetch.baseUrl,
  }
}

export default connect(mapStateToProps)(NewOrder)
