import React, { Component } from 'react'
import PropTypes from "prop-types"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styleDegree } from "../../../../map"
import Button from "../../../Button"

import "./index.css"

/*
组件用法：
type指定了从目录下那个文件夹取图片，每组图片命名必须与对应属性的状态码一致。
stepTo 根据type取到some，表示每个图片对应的属性的状态码,根据some初始化图片展示台个数
buttonArray 根据type，去map中取到对应条目，表示每一项可选状态，比如style，每一项都可以选4种。
stepToImgName 表示每种文件夹下，每个step对应的图片名字
*/

const buttonArray = new Map([
  ["styleBoy", styleDegree],
  ["styleGirl", styleDegree],
])

export default class BabyCarousel extends Component {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.state = {
      buttonClassName: [],
      stepTo: new Map([
        ['styleBoy', new Map([
          [0, 0], // 可爱
          [1, 1], // 酷帅
          [2, 2], // 邻家素雅
          [3, 3], // 绅士
        ])],
        ['styleGirl', new Map([
          [0, 0], // 可爱
          [1, 8], // 欧美
          [2, 2], // 邻家素雅
          [3, 6], // 公主
        ])],
        ['hobbies', new Map([
          [0, 0], // 待定
          [1, 1],
          [2, 2],
          [3, 3],
        ])],
      ]),
      stepToImgName: new Map([
        ['styleBoy', new Map([
          [0, "0.jpg"], // 可爱
          [1, "1.jpg"], // 酷帅
          [2, "2.jpg"], // 邻家素雅
          [3, "3.jpg"], // 绅士
        ])],
        ['styleGirl', new Map([
          [0, "0.jpg"], // 可爱
          [1, "1.jpg"], // 欧美
          [2, "2.jpg"], // 邻家素雅
          [3, "3.jpg"], // 公主
        ])],
      ]),
      step: 0,
    }
    this.state.buttonClassName = this.calcWhichButtonActive(this.state);
  }

  calcWhichButtonActive (state) {
    const { stepTo, step } = state;
    const { item, type } = this.props

    let stepToSome = stepTo.get(type);
    let some = String(stepToSome.get(step));
    let arr = ["carousel-button-box", "carousel-button-box", "carousel-button-box", "carousel-button-box"];
    if ( item !== null && item[some] !== "undefined") {
      arr[item[some]] += " active";
    }
    return arr;
  }

  next(e) {
    const { step, stepTo } = this.state;
    const { type } = this.props
    let stepToSome = stepTo.get(type)

    if ( step === stepToSome.size - 1) {
      this.setState((prevState) => {
        return {step: 0,}
      })
    } else {
      this.setState((prevState) => {
        return {step: step + 1,}
      })
    }
    this.setState((prevState) => {
      return {
        buttonClassName: this.calcWhichButtonActive(prevState)
      }
    })
    let some = String(stepToSome.get(step));
    let item = {};
    item[this.props.propName] = {};
    item[this.props.propName][some] = Number(e.target.dataset.degree);
    this.props.handleChangeBabyItem(item)
    this.slider.slickNext()
  }

  render() {
    const settings = {
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const {type} = this.props
    const { stepToImgName, step, stepTo } = this.state
    return (
      <div>
        <h2 className="carsousel-current-step">{`${this.state.step + 1}/${buttonArray.get(type).size}`}</h2>
        <Slider ref={c => this.slider = c } {...settings}>
          {
            (() => {
              let arr = [];
              // 先去到当前应该展示什么，遍历它
              stepTo.get(type).forEach((value, key) => {
                arr.push(
                  <div key={key} className="carousel-step-img-box">
                    <img alt="展示图片" className="carousel-step-img" src={require( "/" + type + "/" + stepToImgName.get(type).get(step))}/>
                  </div>
                )
              })
              return arr;
            })()
          }

        </Slider>
        <div className="carousel-buttons-wrapper">
          {
            (() => {
              let arr = [];
              buttonArray.get(type).forEach((value, key) => {
                arr.push(
                  <div className={this.state.buttonClassName[key]} key={key} >
                    <Button style={{
                      height: "60px",
                      fontSize: "24px",
                    }} onClick={this.next} data-degree={key}><span data-degree={key}>{value}</span></Button>
                  </div>
                )
              })
              return arr;
            })()
          }
        </div>
      </div>
    );
  }
}



BabyCarousel.propTypes = {
  type: PropTypes.string.isRequired, // 表示显示哪一组图片
  propName: PropTypes.string, // 表示选择的是哪一个宝宝字段
  // item 为{}，或者为""
  handleChangeBabyItem: PropTypes.func,
}
