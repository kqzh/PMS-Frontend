import { Form, Input, Modal, Select } from 'antd';
import React from 'react';
const FormItem = Form.Item;

const AddProjectForm = props => {
  const { handleProjectModalVisible, form, handleAddProject, projectModalVisible,myProjects ,keys} = props;
  const key = keys.map(row=>row.key);
  if(!myProjects){
    return <div></div>
  }
  const okHandle = (key) => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      handleAddProject({...fieldsValue,key});
      handleProjectModalVisible(projectModalVisible);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="添加项目"
      visible={projectModalVisible}
      onOk={()=>okHandle(key)}
      onCancel={() => handleProjectModalVisible(projectModalVisible)}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="项目名称"
      >
        {form.getFieldDecorator('pid', {
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
            {
              myProjects.map(item=>{
                return <Select.Option key={ item.id} value={item.id}>{item.title}</Select.Option>
              })
            }
          </Select>,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(AddProjectForm);
