import React, { Component } from 'react'
import { Route } from "react-router"

// 页面容器组件
import BabyInfo from "./BabyInfo"
import BabyStyle from "./BabyStyle"
import BabyBox from "./BabyBox"

// 页面会用到的小组件
import Gap from "../../Gap"
import Button from "../../Button"
import BabyStep from "./BabyStep";

// 根据请求url后的babyId字段，判断自身为修改/新建

/*
TODO:表单验证
  1.数据是否符合要求
  2.数据是否发生改变，发生改变的发送给后台，若没有发生改变，则不发送
*/
export default class BabyList extends Component {
  constructor(props) {
    super(props)
    let baby, completionRate;
    // 宝宝和完成度初始化

    if (baby === 'new') {
      baby = {
        id: -1,
    		name: '',
    		sex: -1,
    		height: 0,
    		weight: 0,
    		completion_rate: 0, // 后台根据用户填写项，算出来
    		birthday: +new Date(),
    		top_size: 105,
    		bottom_size: 105,
    		hobbies: {},

    		physical_char: {},

    		cloth_style: {
          style: {},
          atom: {},
          color: {},
          expect: -1,
          suit: -1,
        },
    		photo: "",
      }
      completionRate = 0;
    } else {
      baby = this.props.baby;
      completionRate = baby.completion_rate;
    }

    /*
    初始化参数说明：
      baby：宝宝对象
      step：当前宝宝档案填写到哪一步，共三步
        0——基本信息
        1——风格喜好
        2——衣盒信息
      completionRate：档案完整度，每填写一条档案，会触发重新计算这个属性，并重新渲染BabyStep中的完整度数据
    */
    this.state = {
      baby,
      step: 0,
      completionRate,
    }
  }

  handleNext = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div>
        <BabyStep step={this.state.step} completionRate={this.state.completionRate}/>
        <div className="BabyStage">
          <Route exact strict path="/baby/:id" component={BabyInfo}>
          </Route>
          <Route exact strict path="/baby/:id/style" component={BabyStyle} />
          <Route exact strict path="/baby/:id/box" component={BabyBox} />
        </div>
        <Button onClick={this.handleNext.bind(this)} style={{fontSize: "18px", padding: "11px"}}>好了，下一步</Button>
      </div>
    )
  }
}
