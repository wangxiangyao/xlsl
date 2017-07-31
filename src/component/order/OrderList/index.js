import React, { Component } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import BarTop from "../../BarTop"
import OrderBox from "./OrderBox"

import "./index.css"

const TabPane = Tabs.TabPane


export default class OrderList extends Component {

  callback(key) {
    console.log('onChange', key);
  }
  handleTabClick(key) {
    console.log('onTabClick', key);
  }
  render() {
    return (
      <div className="orderlist-wrapper">
        <BarTop text="我的订单"></BarTop>
        <div className="content">
          <Tabs defaultActiveKey="2" onChange={this.callback} onTabClick={this.handleTabClick}>
            <TabPane tab="服务中" key="1">
              <div className="orderlist-stage">
                <OrderBox></OrderBox>
              </div>
            </TabPane>
            <TabPane tab="已完成" key="2">
              <div className="orderlist-stage">
                Content of Second Tab
              </div>
            </TabPane>
          </Tabs>
          <WhiteSpace />
        </div>
      </div>
    )
  }
}
