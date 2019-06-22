import React from 'react';
import { Form, Icon, Input, Button,} from 'antd';

import {reqLogin} from  '../../api'
import logo from '../../assets/images/logo.png';
import './index.less';

const Item = Form.Item;

function Login(props) {
    const handleSubmit=(e)=> {
        e.preventDefault();
        props.form.validateFields(async (errors,values)=>{
           if(!errors){
               const { username, password} = values;
               const data = await reqLogin( username, password)
               if(data){
                   props.history.replace('/');
               }else {
                   props.form.resetFields(['password'])
               }
           }
        });
    }
    const validator = (rule,value,callback)=>{
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
    const { getFieldDecorator } = props.form;
    return (
        <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>后台登录</h1>
            </header>
            <section className="login-content">
                <Form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-form-title">用户登录</h2>
                    <Item>
                        {getFieldDecorator('username',{
                                rules: [
                                    { validator: validator}
                                    ]
                        })( <Input prefix={<Icon type="user"  />}
                                   placeholder="用户名" className="login-input"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('password', {
                                rules: [
                                    { validator: validator}
                                ]
                            })(
                            <Input prefix={<Icon type="lock"  />}
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
export default  Form.create()(Login);