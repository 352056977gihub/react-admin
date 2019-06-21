import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

export default class Login extends Component {
    handleSubmit=(e)=>{
        e.preventDefault();
    }
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台登录</h1>
                </header>
                <section className="login-content">
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <h2 className="login-form-title">用户登录</h2>
                        <Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   placeholder="用户名" className="login-input"/>
                        </Item>
                        <Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   type="password"
                                   placeholder="密码" className="login-input"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}