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
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.statusText);
        }
      }, error => console.log("请求发生错误", error))
      .then(
        (json) => {
          let data = json.data;
          console.log(json)
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
            // 这里显示一个个宝宝，一个的时候，比较大，两个小点，三个和三个以上在小点。
            // 因为一行自适应，所以，在三个以上的时候，要有空的div填充位置，保证每行都是三个
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
            if (arr.length > 1 && arr1.length > 0) {
              for (let i = arr1.length; i < 3; i ++) {
                arr1.push(null);
              }
            }
            arr.push(arr1);
            return arr.map((items, index) => {
              let aKey = -1
              return (
                <div className="baby-stage" key={index}>
                  {
                    items.map((item, index) => {
                      if (item === null) {
                        return <div style={{
                          flex: "0 0 33.3%"
                        }} key={index}></div>
                      }
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
