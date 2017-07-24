import React, { Component } from 'react'
import PropTypes from "prop-types"

import Select from "../../../Select"
import Title from "../../../Title"
import Gap from "../../../Gap"
import Button from "../../../Button"
import CheckBoxGroup from "../../../CheckBoxGroup"
import BabyStep from "../BabyStep";
import BabyCarousel from "../BabyCarousel"
import Slider from "../../../Slider"


export default class BabyBox extends Component {

  /*
  生命周期钩子函数
  */

  endProcess() {
    const { isNew, baby } = this.props
    let myBaby = JSON.parse(JSON.stringify(baby))
    // 因为后台不能接受空对象、空数组形式的json，所以在这里进行判断，如果是空，就转换为空字符串
    for( let [key, val] of Object.entries(myBaby)) {
      if (JSON.stringify(val) === "[]" || JSON.stringify(val) === "{}") {
        myBaby[key] = ""
      }
      if (typeof val === "object") {
        if (!Array.isArray(val)) {
          myBaby[key] = JSON.stringify(val)
        }
        console.log(JSON.stringify(val))
      }
    }

    if (isNew) {
      myBaby.member_id = this.props.memberId;
      console.log(myBaby)
      let url = `http://localhost:9090/baby/`
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(myBaby),
      })
      .then((res) => {
        if (res.ok) {
          // window.location.pathname = "baby";
          console.log(res.body)
        }
      })
      .catch((e) => {
        console.log(e);
      })
    } else {
      let url = `http://localhost:9090/baby/${myBaby.id}/`
      fetch(url, {
        method: "POST",
        body: baby,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }



  render() {
    const { baby,handleChangeBabyItem } = this.props

    return(
      <div>
        <BabyStep step={2} completionRate={baby.completion_rate}/>
        <Gap></Gap>
        <Title text="宝宝对不同场合的衣物的需求~" isRequired={false}></Title>
        <BabyCarousel type={baby.sex === 0 ? "styleBoy" : "styleGirl"} propName="style" item={baby.style} handleChangeBabyItem={handleChangeBabyItem}></BabyCarousel>
        <Gap></Gap>
        <Title text="服装注意事项" isRequired={false}></Title>
        <CheckBoxGroup option={{map: "attention", item: baby.attention}} propName="attention" handleChange={handleChangeBabyItem}></CheckBoxGroup>
        <Gap></Gap>
        <Title text="价格-可接受的价格区间" isRequired={false}></Title>
        <Slider text="可接受的上装价格" propName="top_price" item={baby.top_price} handleChange={handleChangeBabyItem}></Slider>
        <Slider text="可接受的下装价格" propName="bottom_price" item={baby.bottom_price} handleChange={handleChangeBabyItem}></Slider>
        <Slider text="可接受的套装价格" propName="suit_price" item={baby.suit_price} handleChange={handleChangeBabyItem}></Slider>
        <Gap></Gap>
        <Select onSelect={handleChangeBabyItem} option={{
          map: "expect",
          item: baby.expect
        }} text="宝宝愿意尝试特别款式吗？" ></Select>
        <Gap></Gap>
        <Select onSelect={handleChangeBabyItem} option={{
          map: "suit",
          item: baby.suit
        }} text="希望童装成套吗？" ></Select>
        <Gap></Gap>
        <Title text="期待在衣盒中放入什么？" isRequired={false}></Title>
        <CheckBoxGroup option={{map: "sundry", item: baby.sundry}} propName="sundry" handleChange={handleChangeBabyItem}></CheckBoxGroup>
        <Button style={{fontSize: "18px", padding: "11px"}} onClick={this.endProcess.bind(this)}>
          好了，下一步
        </Button>
      </div>
    )
  }
}

BabyBox.propTypes = {
  baby: PropTypes.object,
  handleChangeBabyItem: PropTypes.func.isRequired,

}
