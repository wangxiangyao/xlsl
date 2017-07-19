import { Menu } from 'antd';
import React,{ Component } from 'react';

import NavLink from './NavLink';
import "../../iconfont/iconfont.css";
import "./nav.css";

// 导航组件
export default class Navigation extends Component {
  render () {
    return (
      <div className="navigation">
        <Menu
          className="nav-wrapper"
          // defaultSelectedKeys={['1']} // 根据用户权限，默认选择对应导航
        >
          <Menu.Item key="1" className="nav-item">
            <NavLink to="/" className="nav-link">
              <i className="icon icon-icon"></i>
              <span className="nav-text">首页</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" className="nav-item">
            <NavLink to="/about" className="nav-link">
              <i className="icon icon-eye"></i>
              <span className="nav-text">关于小鹿</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" className="nav-item">
            <NavLink to="/order/new" className="nav-link new-order">
              <i className="icon icon-yifu- new-order-icon"></i>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" className="nav-item">
            <NavLink to="/order" className="nav-link">
              <i className="icon icon-hezi"></i>
              <span className="nav-text">订单列表</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" className="nav-item">
            <NavLink to="/member" className="nav-link">
              <i className="icon  icon-iconfuzhi"></i>
              <span className="nav-text">个人中心</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
