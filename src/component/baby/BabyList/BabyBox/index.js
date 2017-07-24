import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Icon from "antd/lib/icon";
import "antd/lib/icon/style/css";
import "./index.css";

export default class BabyBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baby: this.props.baby
    }
  }

  render() {
    const { baby } = this.state;
    return (
      <div className="baby-box">
        <div className="baby-pic">
          <img alt="宝宝图片"/>
        </div>
        <div className="baby-info">
          <h1 className="name">{baby.name}</h1>
          <p className="weight">宝贝体重：{baby.weight} KG</p>
          <p className="height">宝贝身高：{baby.height} CM</p>
          {
            baby.completion_rate === 100 ?
              <p className="completion-rate">资料完成度 {baby.completion_rate}%</p>
              :
              <p className="completion-rate warning">资料完成度 {baby.completion_rate}% [完全填写可获得10元代金券]</p>
          }
        </div>
        <Link to={`/baby/${baby.id}`}><Icon type="right" className="more-info" /></Link>
      </div>
    )
  }
}
