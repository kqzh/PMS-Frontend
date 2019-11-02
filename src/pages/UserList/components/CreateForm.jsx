import { Form, Input, Modal, Select } from 'antd';
import React from 'react';
const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建学生账号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="学生姓名"
      >
        {form.getFieldDecorator('student_name', {
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="学生学号"
      >
        {form.getFieldDecorator('student_id', {
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="学生班级"
      >
        {form.getFieldDecorator('student_class', {
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        })(
          <Select
            placeholder="请选择"
            style={{
              width: '100%',
            }}
          >
            <Select.Option value="计算机174">计算机174</Select.Option>
            <Select.Option value="计算机175">计算机175</Select.Option>
          </Select>,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
