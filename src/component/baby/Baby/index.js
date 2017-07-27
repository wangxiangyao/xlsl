import React, { Component } from 'react'
import { Route } from "react-router"
import PropTypes from "prop-types"
import "./index.css"

// 引入高阶组件，wrapperBaby，处理newbaby
import WrapperBaby from "./WrapperBaby.js"

// 页面容器组件
import BabyInfo from "./BabyInfo"
import BabyStyle from "./BabyStyle"
import BabyBox from "./BabyBox"

// 页面会用到的小组件
import BarTop from "../../BarTop"

// 根据请求url后的babyId字段，判断自身为修改/新建

/*
TODO:表单验证
  1.数据是否符合要求
  2.数据是否发生改变，发生改变的发送给后台，若没有发生改变，则不发送
*/
class Baby extends Component {
  constructor(props) {
    super(props)
    const { baby, index } = this.props;
    let completionRate, isNew;
    // 宝宝和完成度初始化
    isNew = index === "new" ? true : false;
    completionRate = baby.completion_rate;

    /*
    初始化参数说明：
      baby：宝宝对象
      step：当前宝宝档案填写到哪一步，共三步
        0——基本信息
        1——风格喜好
        2——衣盒信息
      completionRate：档案完整度，每填写一条档案，会触发重新计算这个属性，并重新渲染BabyStep中的完整度数据
      itemNum：需要填写的信息共多少项
    */
    this.state = {
      baby,
      step: 0,
      completionRate,
      isNew,
    }
    this.handleChangeBabyItem.bind(this);
  }

  /*
  以下是各种功能函数
  TODO:记录各个函数详细说明
  */



  // 触发修改宝宝属性
  /* item结构
    item {
    key: val,
    ...
  }
  */

  // 包装index，告诉父组件，现在改变的是哪个宝宝
  handleChangeBabyItem(item) {
    const {index, handleChangeBabyItem} = this.props;
    handleChangeBabyItem(item, index);
  }

  render() {
    const { baby, index } = this.props

    return (
      <div className="baby-wrapper">
        <div>
          <BarTop text="宝贝档案"></BarTop>
        </div>
        <div className="baby-main">

          <div className="baby-tage">
            <Route exact strict path="/baby/:id" render={
                () => <BabyInfo handleChangeBabyItem={this.handleChangeBabyItem.bind(this)} baby={baby} isNew={this.state.isNew}></BabyInfo>
              }
            />

            <Route exact strict path="/baby/:id/style" render={
                () => <BabyStyle handleChangeBabyItem={this.handleChangeBabyItem.bind(this)} baby={baby} isNew={this.state.isNew}></BabyStyle>
              } />
            <Route exact strict path="/baby/:id/box" render={
                () => <BabyBox handleChangeBabyItem={this.handleChangeBabyItem.bind(this)} baby={baby} index={index} isNew={this.state.isNew} memberId={this.props.memberId} history={this.props.history}></BabyBox>
              } />
          </div>
        </div>
      </div>
    )
  }
}

Baby.PropTypes = {
  baby: PropTypes.object,
  index: PropTypes.number,
  handleChangeBabyItem: PropTypes.func,
  createNewBaby: PropTypes.func,
  memberId: PropTypes.number,
}

Baby = WrapperBaby(Baby);

export default Baby;
