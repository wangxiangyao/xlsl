import React, { Component } from 'react'
import MemberLink from './MemberLink.js';
import { Menu } from "antd";
import "../../iconfont/iconfont.css";

export default class Member extends Component {

  render() {
    return (

      <div>
        <div>用户展示</div>
        <div className="member-action">
          <Menu
            style={{ width: 240 }}
          >
            <Menu.Item key="1">
              <MemberLink to="/baby">
                <i className="icon icon-contacts"></i>
                宝宝档案
              </MemberLink>
            </Menu.Item>
            <Menu.Item key="2">
              <MemberLink to="/address">
                <i className="icon icon-location"></i>
                收货地址
              </MemberLink>
            </Menu.Item>
            <Menu.Item key="3">
              <MemberLink to="/message">
                <i className="icon icon-"></i>
                我的消息
              </MemberLink>
            </Menu.Item>
            <Menu.Item key="4">
              <MemberLink to="/">
                <i className="icon icon-like"></i>
                邀请好友赢好礼
              </MemberLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}
