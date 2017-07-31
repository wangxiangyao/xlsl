// 每一个导航按钮
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavLink extends Component {

  render () {
    return (
      <Link
        {...this.props}
        style={{
          fontSize: "24px",
          color: "#3FC8CF",
          textDecoration: "none",
        }}
      >
      </Link>
    )
  }
}
