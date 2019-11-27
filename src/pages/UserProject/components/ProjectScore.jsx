import { Form, Input, Modal,message } from 'antd';
import React from 'react';
const FormItem = Form.Item;

const ProjectScore = props => {
  const { form,scoreVisible,handleScoreModalVisible,select,handleScore} = props;
  const okHandle = (select) => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      const value = {...fieldsValue,student_id:select.student_id,pid:select.pid};
      value.score = parseInt(value.score);
      handleScore(value);
      handleScoreModalVisible(scoreVisible);

    });
  };

  return (
    <Modal
      destroyOnClose
      title="项目评分"
      visible={scoreVisible}
      onOk={()=>okHandle(select)}
      onCancel={() => handleScoreModalVisible(scoreVisible)}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="项目分数"
      >
        {form.getFieldDecorator('score', {
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        })(
          <Input
            placeholder="请输入"
            style={{
              width: '100%',
            }}
          />,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(ProjectScore);
