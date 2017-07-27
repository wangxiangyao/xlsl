import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"


export default class MyInput extends Component {

  render() {
    return(
      <div className={`title ${this.props.isRequired ? "need" : ""}`}>
        <div className="title-left" style={this.props.style}>{this.props.text}</div>
        <div className="title-right">
          {this.props.children}
        </div>

      </div>
    )
  }
}

MyInput.propTypes = {
  text: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
}
