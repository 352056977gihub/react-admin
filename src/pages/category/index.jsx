import React, {Component} from 'react';
import { Card ,Button ,Icon ,Table, Modal,message} from 'antd';

import './index.less'
import {reqCategory,reqAddCategory,reqUpdateCategory,} from "../../api";
import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from './update-category-form'

export default class Category extends Component {
    state={
        categories:[],
        addCategoryFormVisible: false,
        updateCategoryFormVisible: false
    }
    async componentDidMount() {
        //const res = await reqCategory();
        //this.setState({categories:res})
        this.showCategory()();
    }
    showCategory=(c={})=>{
        return async ()=>{
            const res = await reqCategory(c._id);
            this.parentName=c.name
            this.setState({categories:res})
        }
    }
    setVisible=(name,value)=>{
        return ()=>{
            this.setState({[name]:value})
        }
    }
    addCategory=()=>{
        const {form} = this.addCategoryForm.props
        form.validateFields(async (errors,values)=>{
            if(!errors){
                const {parentId,categoryName} = values;
                const res = await reqAddCategory(parentId,categoryName);
                if(res){
                    form.resetFields(['parentId','categoryName']);
                    message.success('添加分类成功',2);
                    const options = {
                        addCategoryFormVisible:false
                    }
                    if(res.parentId==='0'){
                        options.categories=[...this.state.categories,res]
                    }
                    this.setState(options)
                }
            }
        })
    }
    showUpdateCategory=(c)=>{
        return ()=>{
            this.setState({updateCategoryFormVisible:true})
            this.category=c;
        }
    }
    cancelUpdate=()=>{
        this.setState({updateCategoryFormVisible:false})
        this.updateCategoryForm.props.form.resetFields(['categoryName'])
    }
    updateCategory=()=>{
        const {form} = this.updateCategoryForm.props;
        form.validateFields(async (errors,values)=>{
            if(!errors){
                const {categoryName} = values;
                const categoryId = this.category._id;
                const res = await reqUpdateCategory(categoryId,categoryName);
                if(res){
                    message.success('修改分类成功',2);
                    form.resetFields(['categoryName']);
                    const categories = this.state.categories.map((c)=>{
                        const {parentId,_id} = c;
                        if(_id === this.category._id ){
                            return {
                                name:categoryName,
                                parentId,
                                _id
                            }
                        }
                        return c;
                    })
                    this.setState({updateCategoryFormVisible:false,categories});
                }
            }
        })
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
                render: (c) => <div><Button  type="link" onClick={this.showUpdateCategory(c)}>修改名称</Button><Button type="link" onClick={this.showCategory(c)} style={{visibility:c.parentId==='0'?'visible':'hidden'}}>查看子品类</Button></div>,
            }
        ];
        const {categories,addCategoryFormVisible,updateCategoryFormVisible} = this.state;
        return (
            <Card title={
                this.parentName? <div><Button onClick={this.showCategory()} type="link">一级分类</Button><Icon type="double-right" />{this.parentName}</div>:<div>一级分类</div>
                    }
                extra={<Button type="primary" onClick={this.setVisible('addCategoryFormVisible',true)}><Icon type="plus" />添加品类</Button>} style={{ width: '100%' }}>
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
                    rowKey='_id'
                />
                <Modal
                  title="添加分类"
                  visible={addCategoryFormVisible}
                  onOk={this.addCategory}
                  onCancel={this.setVisible('addCategoryFormVisible',false)}
                >
                   <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form} />
                </Modal>
                <Modal
                  width={250}
                  title="修改分类"
                  visible={updateCategoryFormVisible}
                  onOk={this.updateCategory}
                  onCancel={this.cancelUpdate}
                >
                    <UpdateCategoryForm  category={this.category} wrappedComponentRef={(form) => this.updateCategoryForm = form} />
                </Modal>
            </Card>
        )
    }
}