import React, { Component } from 'react'
import PropTypes from "prop-types"
import StepLine from "./StepLine.js"
import "../../iconfont/iconfont.css"
import "./step.css"


export default class Step extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let icon = this.props.icon;
    let text = this.props.text;
    let step = this.props.step;
    return (
      <div className="step-wrapper">
        {
          icon.map((icon, index) => {
            let active = "";
            if (index <= step) {
              active = "active"
            }
            if (index === 0) {
              return (
                <div className={`step ${active}`} key={index}>
                  <div className="step-circle">
                    <i className={`step-icon icon ${icon}`}/>
                  </div>
                  <div className="step-text">{text[index]}</div>
                </div>
              )
            }
            return (
              <div className="step-box" key={index}>
                <div className="step-top">
                  <StepLine className={`${active}`}></StepLine>
                  <div className="step-circle">
                    <i className={`step-icon icon ${icon}`}/>
                  </div>
                </div>
                  {
                    text[index] ?
                      <div className="step-text">{text[index]}</div>
                      :
                      null
                  }
              </div>

            )
          })
        }
      </div>
    )
  }
}

Step.defaultProps = {
  text: ["步骤名", "step2", "step3"],
  icon: ["right", "left", "right"],
}

Step.propTypes = {
  text: PropTypes.arrayOf(
      PropTypes.string
  ),
  icon: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  step: PropTypes.number.isRequired,
}
