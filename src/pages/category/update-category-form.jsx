import React, {Component} from 'react';
import {Form,Input} from 'antd'

class UpdateCategoryForm extends Component {
  validator=(rule,value,callback)=>{
    if(!value) return callback('请输入分类名称')
    if(value===this.props.category.name) return callback('分类名称已存在')
    callback();
  }
  render() {
    const {category,form:{getFieldDecorator}} = this.props;
    return (
     <Form>
      <Form.Item>
        {
          getFieldDecorator('categoryName',
            {
              initialValue: category.name,
              rules: [{validator: this.validator}]
            }
          )(<Input />)
        }
      </Form.Item>
     </Form>
    )
  }
}
export default Form.create()(UpdateCategoryForm)