import React, {Component} from 'react';
import {Button} from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
export default class HeaderMain extends Component {
    render() {
        return (
            <div className="header-main">
               <div className="header-main-top">
                   <span>欢迎,admin</span>
                   <Button type="link">退出</Button>
               </div>
               <div className="header-main-bottom">
                   <span className="title">首页</span>
                   <div className="info">
                       <span>{new Date().toDateString()}</span>
                       <img src={logo} alt="weather"/>
                       <span>晴</span>
                   </div>
               </div>
            </div>
        )
    }
}