import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Input from "../../../Input"
import Select from "../../../Select"
import Title from "../../../Title"
import Gap from "../../../Gap"
import Button from "../../../Button"
import SkinColorSelect from "./SkinColorSelect"
import CheckBoxGroup from "../../../CheckBoxGroup"
import BabyStep from "../BabyStep";
import UpLoadImg from "./UpLoadImg"


export default class BabyInfo extends Component {
  /*
  生命周期钩子函数
  */
  // TODO: 宝宝生日组件
  // TODO: 宝宝传图片


  render() {
    const { baby,handleChangeBabyItem } = this.props
    console.log(this.props)
    return(
      <div>
        <BabyStep step={0} completionRate={baby.completion_rate ? baby.completion_rate : 0}/>
        <Gap></Gap>
        <Input placeholder="请输入您对宝贝的爱称" addonBefore="宝宝昵称" onChange={handleChangeBabyItem} propName="name" item={baby.name}></Input>
        <Select onSelect={this.props.handleChangeBabyItem} option={{
          map: "sex",
          item: baby.sex
        }} text="宝宝性别" ></Select>
        <Gap></Gap>
        <Input placeholder="请输入宝贝身高" addonBefore="宝宝身高（CM）" onChange={handleChangeBabyItem} propName="height" item={baby.height}></Input>
        <Input placeholder="请输入宝贝体重，注意是KG哦~" addonBefore="宝宝体重（KG）" onChange={handleChangeBabyItem} propName="weight" item={baby.weight}></Input>
        <Gap></Gap>
        <Input placeholder="平时上装尺寸" addonBefore="宝贝上装尺寸（CM）" onChange={handleChangeBabyItem} propName="top_size" item={baby.top_size}></Input>
        <Input placeholder="平时下装尺寸" addonBefore="宝贝下装尺寸（CM）" onChange={handleChangeBabyItem} propName="bottom_size" item={baby.bottom_size}></Input>
        <Gap></Gap>
        <Title text="宝宝的肤色（非必填）" isRequired={false} ></Title>
        <SkinColorSelect handleChangeBabyItem={this.props.handleChangeBabyItem} skinColor={this.props.baby.skin_color}></SkinColorSelect>
        <Gap></Gap>
        <Title text="宝贝体态特征（非必填）" isRequired={false}></Title>
        <CheckBoxGroup option={{map: "babyBody", item: baby.baby_body}} propName="baby_body" handleChange={this.props.handleChangeBabyItem}></CheckBoxGroup>
        <Gap></Gap>
        <Title text="上传宝宝图片"></Title>
        <UpLoadImg></UpLoadImg>
        <Button style={{fontSize: "36px", padding: "22px"}}>
          <Link to={`/baby/${this.props.isNew ? "new" :baby.id}/style`}>
          好了，下一步
          </Link>
        </Button>
      </div>
    )
  }
}

BabyInfo.propTypes = {
  baby: PropTypes.object,
  handleChangeBabyItem: PropTypes.func.isRequired,
}
