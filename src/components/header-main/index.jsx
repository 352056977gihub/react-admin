import React, {Component} from 'react';
import { Modal, Button } from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';
import menuList from '../../config/config-menu';

import './index.less'
import {getItem,removeItem} from '../../utils/storage-tools';
import {reqWeather} from "../../api";

const { confirm } = Modal;

class HeaderMain extends Component {
    state={
        time: Date.now(),
        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather: '晴'
    }
    async componentWillMount() {
        this.title = this.getTitle(this.props);
        this.username = getItem().username;
        const res = await reqWeather();
        this.setState(res);
    }
    componentDidMount() {
        this.timer = setInterval(()=>{
            this.setState({time:Date.now()})
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState = (state, callback) => {
            return
        }
    }
    componentWillReceiveProps(nextProps) {
        this.title = this.getTitle(nextProps);
    }

    logout = ()=>{
        confirm({
            title: '是否确认退出?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=> {
                removeItem();
                this.props.history.replace('/login');
            }
        });
    }
    getTitle=(props)=>{
        const {pathname} = props.location;
        for(let i = 0; i<menuList.length;i++){
            if(menuList[i].children){
                for(let j = 0 ;j<menuList[i].children.length;j++ ){
                    if(pathname===menuList[i].children[j].key) return menuList[i].children[j].title;
                }
            }else{
                if(pathname===menuList[i].key) return menuList[i].title;
            }
        }

    }
    render() {
        const {time ,dayPictureUrl,weather} = this.state;
        return (
            <div className="header-main">
               <div className="header-main-top">
                   <span>欢迎,{this.username}</span>
                   <Button type="link" onClick={this.logout} style={{wordSpacing:'0px'}}>退出</Button>
               </div>
               <div className="header-main-bottom">
                   <span className="title">{this.title}</span>
                   <div className="info">
                       <span>{dayjs(time).format('YYYY/MM/DD HH:mm:ss')}</span>
                       <img src={dayPictureUrl} alt="weather"/>
                       <span>{weather}</span>
                   </div>
               </div>
            </div>
        )
    }
}
export default withRouter(HeaderMain);