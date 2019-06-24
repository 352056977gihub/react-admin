import React, {Component} from 'react';
import { Card ,Button ,Icon ,Table} from 'antd';

import './index.less'
import {reqCategory} from "../../api";

export default class Category extends Component {
    state={
        categories:[]
    }
    async componentDidMount() {
        const res = await reqCategory('0');
        const data = res.map((item,index)=>({name:item.name,key:index}))
        this.setState({categories:data})
    }

    render() {
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                className: 'operation',
                dataIndex: 'operation',
                render: () => <div><Button type="link">修改名称</Button><Button type="link">查看子品类</Button></div>,
            }
        ];
        const {categories} = this.state;
        return (
            <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>} style={{ width: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={categories}
                    bordered
                    pagination={{
                        pageSizeOptions: ['3','6','9'],
                        showSizeChanger: true,
                        defaultPageSize: 3,
                        showQuickJumper: true
                    }}
                />,
            </Card>
        )
    }
}