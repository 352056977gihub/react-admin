import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component {
    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.form.validateFields((errors,values)=>{
           if(!errors){
               this.props.history.push('/');
           }
        });
    }
    validator = (rule,value,callback)=>{
        const name = rule.field==='username'?'用户名':'密码';
        if(!value){
            callback(`请输入${name}`)
        }else if(value.length<4){
            callback(`${name}必须大于4位`)
        }else if(value.length>12){
            callback(`${name}必须小于12位`)
        }else if(!/^[0-9_a-zA-Z]+/.test(value)){
            callback(`${name}只能包含数字,字母,下划线`)
        }else{
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
                            {getFieldDecorator('username',{
                                    rules: [
                                        { validator: this.validator}
                                        ]
                            })( <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       placeholder="用户名" className="login-input"/>
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validator}
                                    ]
                                })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type="password"
                                       placeholder="密码" className="login-input"/>
                            )}
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
export default  Form.create()(Login);