import React, { Component } from "react"
import { Form, Icon, Checkbox } from 'antd';
import { connect } from "react-redux"
import { fetchData } from "../../actions"

import Input from "../Input"
import Button from "../Button"
import Gap from "../Gap"

import "./login.css"
const FormItem = Form.Item;

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      const { member, dispatch } = this.props

      let data = {
        ...values,
        code: values.code.undefined,
      }
      if (!err) {
        dispatch(
          fetchData(
            {
              path: "/login",
              config: {
                method: "POST",
                body: JSON.stringify(data)
              }
            },
            (url, option) => {
              fetch(url, option)
              .then(
                (res) => {
                  if (res.ok) {
                    return res.json()
                  }
                }
              )
              .then(
                (json) => {
                  console.log(json)
                }
              )
              .catch((e) => console.log(e))
            }
          )
        )
        console.log('Received values of form: ', values);
        // TODO:发起请求
        // TODO:成功后，派发UPDATA_MEMBER
      }
    });
  }
  handleChange() {
    return;
  }
  handleGetCode() {
    const { member, dispatch }  = this.props
    dispatch(
      fetchData({
      path: "/sendMsgCode",
      config: {
        method: "POST",
        mobile: member.phone,
        body: JSON.stringify({mobile: member.phone})
      }
    },
    (url, option) => {
      console.log(123)
      fetch(url, option)
      .then(
        (res) => {
          if (res.ok) {
            return res.json()
          }
        }
      )
      .then(
        (json) => {
          console.log(json);
        }
      )
      .catch((e) => console.log(e))
    }
  ))
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-wrapper">
        <div className="avator-wrapper">
          <img className="user-avator" />
        </div>
        <Gap />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入手机号!' }],
            })(
              <Input addonBefore="手机号" type="user" placeholder="手机号" onChange={this.handleChange} />
            )}
          </FormItem>
          <FormItem className="input-code">
            {getFieldDecorator('code', {
              rules: [{ required: false, message: '请输入验证码!' }],
            })(
              <Input addonBefore="验证码" type="text" placeholder="验证码" />
            )}
            <div className="code-button-wrapper" onClick={this.handleGetCode.bind(this)}>
              <div className="code-button">发送验证码</div>
            </div>
          </FormItem>
          <FormItem className="login-myButton">
            <Button type="primary" htmlType="submit" style={{
              height: "88px",
              fontSize: "24px",
            }}>
              立即登录/注册
            </Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

const WrapperForm = Form.create({
  onFieldsChange: (props, fields) => {console.log(props, fields)},
  mapPropsToFields: (props) => {
    return {
      username: {
        value: props.member.phone,
      }
    }
  },
})(Login)

function mapStateToProps(state){
  return {
    member: state.member
  }
}

export default connect(mapStateToProps)(WrapperForm)
