import React, { Component } from 'react'
import PropTypes from "prop-types"
import Step from "../../../Step";
import "./babystep.css"

export default class BabyStep extends Component {
  constructor(props) {
    super(props)

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
      <div className="babystep-wrapper">
        <Step step={step} text={text} icon={icon}/>
      </div>
    )
  }
}

BabyStep.propTypes = {
  step: PropTypes.number.isRequired,
  completionRate: PropTypes.number.isRequired,
}
