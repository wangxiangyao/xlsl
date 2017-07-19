import React, { Component } from "react"
import "./stepline.css"

export default class StepLine extends Component {
  render () {
    return (
      <div className={`step-line ${this.props.className}`}></div>
    )
  }
}
