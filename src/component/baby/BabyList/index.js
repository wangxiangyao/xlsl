import React, { Component } from 'react'
import Gap from "../../Gap"
import BabyBox from "./BabyBox"
import BarTop from "../../BarTop"
import { Link } from "react-router-dom"

import "./index.css"

export default class BabyList extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    this.state = {
      babies: this.props.babies,
    }
  }

  render() {
    const babies = this.state.babies

    return (
      <div>
        <div className="top-bar-wrapper">
          <BarTop text="宝宝列表">
            <Link to="/baby/new">添加宝宝</Link>
          </BarTop>
        </div>
        <div className="baby-list">
          <Gap></Gap>
          {
            (() => {
              let arr = [];
              for(let [key, val] of Object.entries(babies)) {
                arr.push(
                  <BabyBox baby={val} key={key}></BabyBox>
                )
              }
              return arr;
            })()
          }

        </div>
      </div>
    )
  }
}
