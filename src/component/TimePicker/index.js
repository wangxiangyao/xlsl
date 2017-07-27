import React, { Component } from 'react'
import PropTypes from "prop-types"
import Calendar from "antd/lib/calendar"
import "antd/lib/calendar/style/css"

import "./index.css"

export default class TimePicker extends Component {


  notSelectDate = (date) => {
    let { joinTime } = this.props

    const now = +new Date()
    if(!joinTime) {
      joinTime = now;
    }
    const endTime = joinTime + 31536000000
    // 从注册，加1年
    let theDate = +new Date(date);
    // 如果时间 大于加入时间，且大于两天后，且小于结束时间，就可以选择
    if (theDate > now + 172800000 && theDate < endTime) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return(
      <div className="time-picker">
        <Calendar
          style={{
            backgroundColor: "#fff"
          }}
          fullscreen={false} onSelect={this.props.handleChangeOrderDay}
          disabledDate={this.notSelectDate.bind(this)}
        />
      </div>
    )
  }
}
// 未指定option.item的类型
TimePicker.propTypes = {
  handleChangeOrderDay: PropTypes.func,
  joinTime: PropTypes.number,
}
