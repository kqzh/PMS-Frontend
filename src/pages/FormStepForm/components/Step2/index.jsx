import { Alert, Button, Descriptions, Divider, Statistic, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const { form, data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formStepForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'formStepForm/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'formStepForm/saveCurrentStep',
          payload: 'result',
        });
      }
    });
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert
        closable
        showIcon
        message="查看学生第一次申请项目的内容"
        style={{
          marginBottom: 24,
        }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="项目名称"> 图书馆后台管理系统</Descriptions.Item>
        <Descriptions.Item label="学生学号">2017212212088</Descriptions.Item>
        <Descriptions.Item label="学生名称"> 刘鑫超</Descriptions.Item>
        <Descriptions.Item label="项目描述">一个复杂的后台管理系统</Descriptions.Item>
      </Descriptions>
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item {...formItemLayout} label="Github地址" required={false}>
        {getFieldDecorator('password', {
          initialValue: 'https://github.com/kqzh/PMS-Backend',
          rules: [
            {
              required: true,
              message: '需要支付密码才能进行支付',
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
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ formStepForm, loading }) => ({
  //submitting: loading.effects['formStepForm/submitStepForm'],
  data: formStepForm.step,
}))(Form.create()(Step2));
