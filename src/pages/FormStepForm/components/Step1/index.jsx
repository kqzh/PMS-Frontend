import { Alert, Button, Descriptions, Divider, Form, Input, Select, Statistic } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = props => {
  const { form, dispatch, data,desc } = props;
  if (!data&&!desc) {
    return null;
  }

  const { getFieldDecorator, validateFields } = form;

  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'formStepForm/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message="查看学生申请项目的内容"
        style={{
          marginBottom: 24,
        }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="学生学号">{data.student_id}</Descriptions.Item>
        <Descriptions.Item label="项目名称"> {data.title}</Descriptions.Item>
        <Descriptions.Item label="项目描述">{data.description}</Descriptions.Item>
      </Descriptions>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item {...formItemLayout} label="Github地址" required={false}>
        {getFieldDecorator('password', {
          initialValue: desc.address1,
          rules: [
            {
              required: true,
              message: '学生还未申请项目',
            },
          ],
        })(
          <Input
            disabled
            autoComplete="off"
            style={{
              width: '80%',
            }}
          />,
        )}
      </Form.Item>
      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button type="primary" onClick={onValidateForm} >
          下一步
        </Button>

      </Form.Item>
    </Form>
  );
};

export default connect(({ formStepForm }) => ({
  data: formStepForm.myStore,
  desc: formStepForm.stepList
}))(Form.create()(Step1));
