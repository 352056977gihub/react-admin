import React, {Component} from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


export default class Main extends Component {
    render() {
        return (
            <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}