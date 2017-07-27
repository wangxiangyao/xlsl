import React, { Component } from 'react'
import PropTypes from "prop-types";
import StageBox from "./StageBox.js"
import { connect } from 'react-redux'
import { fetchIfNeeded, requestBabies, receiveBabies } from '../../../../actions'

import Icon from "antd/lib/icon"
import { Link } from "react-router-dom"
import "antd/lib/icon/style/css"

import "./index.css"

class OrderBabyBox extends Component {

  componentDidMount() {
    this.requestBabyData();
  }

  requestBabyData() {
    const { memberId, dispatch } = this.props;
    console.log(memberId)
    let option = {
      name: "babies",
      path: `/baby/${memberId}/`,
      config: {
        method: "POST",
      },
    }

    let fetchBaby = (url, option) => {
      dispatch(requestBabies())
      fetch(url, option)
      .then((res) => {
        console.log(1);
        return res.json();
      }, error => console.log("请求发生错误", error))
      .then(
        (json) => {
          let data = json.data;
          dispatch(receiveBabies(data))
        }
      )
      .catch(
        (e) => {
          console.log(e);
        }
      )
    }
    dispatch(fetchIfNeeded(option, fetchBaby))
  }

  isEmptyObject(obj) {
    for( let a of Object.values(obj)) {
      return false;
    }
    return true;
  }

  render() {

    const { babies } = this.props
    console.log(babies)

    // 判空处理
    if (this.isEmptyObject(babies)) {
      return (
        <div>正在加载</div>
      )
    }

    return (
      <div className="order-baby-box">
        <div className="title">
          <div className="text">我的宝贝</div>
          <div className="new-baby">
            <Link className="item" to="/baby/new">添加新宝宝 <Icon className="item" type="right" /></Link>
          </div>
        </div>
        {
          (() => {
            let arr = [],
                arr1 = [], // 中间量
                i = 0; // 用来计数的，多个宝宝，三个一组往外传
            for ( let [key, val] of Object.entries(babies)) {
              if (i % 3 === 0) {
                arr.push(arr1)
                i = 0;
                arr1 = [];
              }
              arr1.push(val)
              i++
            }
            arr.push(arr1);
            return arr.map((items, index) => {
              return (
                <div className="baby-stage" key={index}>
                  {
                    items.map((item) => {
                      return (
                        <StageBox
                          handleChangeOrderBaby={this.props.handleChangeOrderBaby}
                          baby={item}
                          key={item.id}
                          orderBaby={this.props.orderBaby}>

                        </StageBox>
                      )
                    })
                  }
                </div>
              )
            })
          })()
        }
      </div>
    )
  }
}

OrderBabyBox.PropTypes = {
  babies: PropTypes.array,
  handleChangeOrderBaby: PropTypes.func,
  orderBaby: PropTypes.array,
}
function mapStateToProps(state) {
  return {
    memberId: state.member.id,
  }
}

export default connect(mapStateToProps)(OrderBabyBox)
