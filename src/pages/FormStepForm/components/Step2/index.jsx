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
  const { form, data, dispatch, desc } = props;

  if (!data&&desc) {
    return null;
  }

  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
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
        message="查看学生第一周项目总结"
        style={{
          marginBottom: 24,
        }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="学生学号">{data.student_id}</Descriptions.Item>
        <Descriptions.Item label="项目名称"> {data.title}</Descriptions.Item>
        <Descriptions.Item label="项目描述">{data.description}</Descriptions.Item>
        <Descriptions.Item label="第一周总结">{desc.desc1}</Descriptions.Item>
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
  data: formStepForm.myStore,
  desc: formStepForm.stepList
}))(Form.create()(Step2));
