import React, {Component} from 'react';
import {Form, Input, Select} from "antd";

const {Item} = Form;
const {Option} = Select

class AddCategoryForm extends Component {
  validator=(rule,value,callback)=>{
    if(!value) return callback('请输入分类');
    const res = this.props.categories.find((c)=>c.name===value)
    if(res){
      callback('分类已存在');
    }else{
      callback();
    }
  }
  render() {
    const {categories,form:{getFieldDecorator}} = this.props
    return (
      <Form>
        <Item label="所属分类">
          {
            getFieldDecorator('parentId',
              {initialValue:'0'}
            )(
              <Select>
                <Option value="0">一级分类</Option>
                {categories.map((c)=><Option value={c._id} key={c._id}>{c.name}</Option>)}
              </Select>
            )
          }
        </Item>
        <Item label="分类名称">
          {getFieldDecorator('categoryName',{
          rules: [{validator:this.validator}]
        })(<Input placeholder="请输入分类名称"/>)}
        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddCategoryForm);