import React, {Component} from 'react';
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';

const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed }=this.state ;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <LeftNav  collapsed={ collapsed} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 ,minHeight: 100}} >
                        <HeaderMain/>
                    </Header>
                    <Content style={{ margin: '20px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器</Footer>
                </Layout>
            </Layout>
        );
    }
}