import React, { Component } from 'react'
import PropTypes from "prop-types"
import Step from "../../../Step";
import Progress from "antd/lib/progress"
import "antd/lib/progress/style/css"

import "./babystep.css"

export default class BabyStep extends Component {
  constructor(props) {
    super(props)

    //TODO:文字和图标抽象，根据外部传入条件，选择显示何种文字和图标

    // 初始化描述和图标
    this.state = {
      text: [
        "基本信息",
        "穿搭风格",
        "小衣盒",
      ],
      icon: [
        "icon-iconfuzhi",
        "icon-yifu1",
        "icon-hezi",
      ]
    }
  }

  render() {
    const { step, completionRate } = this.props
    const { text, icon } = this.state

    return (
      <div>
        <div className="babystep-wrapper">
          <Step step={step} text={text} icon={icon}/>
        </div>
        <div className="progress">
          <span className={`progress-text ${completionRate === 100 ? "completion" : ""}`}>完成度：{completionRate}%</span>
          <Progress percent={completionRate} status={completionRate === 100 ? "success" : "active"} showInfo={false} strokeWidth={2} style={{fontSize: 0}}/>
        </div>
      </div>
    )
  }
}

BabyStep.propTypes = {
  step: PropTypes.number.isRequired,
  completionRate: PropTypes.number.isRequired,
}
