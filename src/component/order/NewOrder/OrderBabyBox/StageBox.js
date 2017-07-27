import React, { Component } from 'react'
import PropTypes from "prop-types";

import { Link } from "react-router-dom"
import Icon from "antd/lib/icon"
import "antd/lib/icon/style/css"

import "./stageBox.css"

export default class StageBox extends Component {

  constructor(props) {
    super(props)
    let isChooies;
    const { orderBaby, baby } = this.props
    if (orderBaby.indexOf(baby.id) > -1) {
      isChooies = true;
    } else {
      isChooies = false;
    }
    this.state = {
      isChooies,
    }
  }

  handleChangeOrderBaby() {
    const { baby, handleChangeOrderBaby } = this.props
    const { isChooies } = this.state
    this.setState({
      isChooies: !isChooies,
    })
    handleChangeOrderBaby(baby.id);
  }

  render() {

    const { baby, orderBaby } = this.props
    const { isChooies } = this.state
    if (!baby) {
      return (
        <div>
          正在加载
        </div>
      )
    }

    return (
      <div className="stagebox-wrapper">
        <div className="stage-box">
          <div className="floor floor-1">
            <img className="floor-img" src={require( "/" + Math.floor(Math.random() * 2) + ".png")} />
          </div>

            {
              (() => {
                if (isChooies) {
                  return (
                    <div className="floor floor-2">
                      <div className="text name">{baby.name}</div>
                      <div className="text height">身高 {baby.height} cm</div>
                      <div className="text weight">体重 {baby.weight} kg</div>
                    </div>

                  )
                } else {
                  return (
                    <div className="floor floor-2">
                      <div className="text name">{baby.name}</div>
                      <div className="text">
                        宝宝也想要~~
                      </div>
                    </div>
                  )
                }
              })()
            }

          <div
            className={
            (() => {
              if (orderBaby.indexOf(baby.id) > -1) {
                return "order-toggle active";
              } else {
                return "order-toggle";
              }
            })()
          }
          onClick={this.handleChangeOrderBaby.bind(this)}>
            给ta订~
          </div>
        </div>
        <div className="stage-change-baby">
          <Link className="action" to={`/baby/${baby.id}`}>修改档案 <Icon className="item" type="right" /></Link>
        </div>
      </div>
    )
  }
}

StageBox.PropTypes = {
  baby: PropTypes.object,
  orderBaby: PropTypes.array,
  handleChangeOrderBaby: PropTypes.func,
}
