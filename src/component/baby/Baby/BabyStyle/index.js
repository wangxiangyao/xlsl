import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Title from "../../../Title"
import Gap from "../../../Gap"
import Button from "../../../Button"
import CheckBoxGroup from "../../../CheckBoxGroup"
import BabyStep from "../BabyStep";
import BabyCarousel from "../BabyCarousel"
import ColorPick from "./ColorPick"


export default class BabyStyle extends Component {
  /*
  生命周期钩子函数
  */
  // TODO: 宝宝生日组件
  // TODO: 宝宝传图片


  render() {
    const { baby,handleChangeBabyItem } = this.props

    return(
      <div>
        <BabyStep step={1} completionRate={baby.completion_rate}/>
        <Gap></Gap>
        <Title text="宝贝和你喜欢的风格~" isRequired={true}></Title>
        <BabyCarousel type={baby.sex === 0 ? "styleBoy" : "styleGirl"} propName="style" item={baby.style} handleChangeBabyItem={handleChangeBabyItem}></BabyCarousel>
        <Gap></Gap>
        <Title text="平时喜欢的童装品牌" isRequired={false}></Title>
        <CheckBoxGroup option={{map: "brand", item: baby.brand}} propName="brand" handleChange={handleChangeBabyItem}></CheckBoxGroup>
        <Gap></Gap>
        <Title text="对颜色的喜好" isRequired={false}></Title>
        <ColorPick handleChange={handleChangeBabyItem} item={baby.color}></ColorPick>
        <Gap></Gap>
        <Title text="喜欢的细节" isRequired={false}></Title>
        <CheckBoxGroup option={{map: "atom", item: baby.atom}} propName="atom" handleChange={handleChangeBabyItem}></CheckBoxGroup>
        <Button style={{fontSize: "18px", padding: "11px"}}>
          <Link to={`/baby/${this.props.isNew ? "new" : baby.id}/box`}>
          好了，下一步
          </Link>
        </Button>
      </div>
    )
  }
}

BabyStyle.propTypes = {
  baby: PropTypes.object,
  handleChangeBabyItem: PropTypes.func.isRequired,
}
