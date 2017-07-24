import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"


export default class MyInput extends Component {

  render() {
    return(
      <div className={`title ${this.props.isRequired ? "need" : ""}`}>
        {this.props.text}
      </div>
    )
  }
}

MyInput.propTypes = {
  text: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
}
