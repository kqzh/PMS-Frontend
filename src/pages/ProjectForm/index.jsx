import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import moment from 'moment';
import Upload from 'antd/es/upload';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, listCardList }) => ({
  projectList: listCardList.list,
  loading: loading.models.listCardList,
}))
class ProjectForm extends Component {
  handleSubmit = e => {
    const { dispatch, form, location } = this.props;
    const params = location.query;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const pid = parseInt(params.id);
      let avatar,tmp;
      if(params.method!=="update"){
        avatar = values.upload.file.response.filePath;
        tmp = { ...values, startTime: values.date[0], endTime: values.date[1], id: pid ,avatar:avatar}; //console.log(tmp);
      }else{
        tmp = { ...values, startTime: values.date[0], endTime: values.date[1], id: pid }; //console.log(tmp);
      }

      if (!err) {
        if (params.method === 'update') {
          dispatch({
            type: 'projectForm/updateRegularForm',
            payload: tmp,
          });
        } else {
          dispatch({
            type: 'projectForm/submitRegularForm',
            payload: tmp,
          });
        }

        setTimeout(() => {
          this.props.history.push('/projectlist');
        }, 1000);
      }
    });
  };
  state = {
    list: {},
  };

  componentDidMount() {
    const { dispatch, location, projectList } = this.props;
    const params = location.query;

    if (params.method === 'update') {
      for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].id === parseInt(params.id)) {
          this.setState({
            list: projectList[i],
          });
          break;
        }
      }
    } //setTimeout(()=>console.log(this.state.list),1000);
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    const { list } = this.state;
    const startDate = moment(list.startTime);
    const endDate = moment(list.endTime);
    const uploadProps = {
      action:"/api/projects/upload",
      headers:{
        authorization:localStorage.getItem("pro_token")
      }
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="projectform.basic.description" />}>

        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...formItemLayout} label={<FormattedMessage id="projectform.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'projectform.title.required',
                    }),
                  },
                ],
                initialValue: list.title,
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'projectform.title.placeholder',
                  })}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="projectform.date.label" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'projectform.date.required',
                    }),
                  },
                ],
                initialValue: [startDate, endDate],
              })(
                <RangePicker
                  style={{
                    width: '100%',
                  }}
                  placeholder={[
                    formatMessage({
                      id: 'projectform.placeholder.start',
                    }),
                    formatMessage({
                      id: 'projectform.placeholder.end',
                    }),
                  ]}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="projectform.goal.label" />}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'projectform.goal.required',
                    }),
                  },
                ],
                initialValue: list.description,
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder={formatMessage({
                    id: 'projectform.goal.placeholder',
                  })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="projectform.standard.label" />}
            >
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'projectform.standard.required',
                    }),
                  },
                ],
                initialValue: list.standard,
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder={formatMessage({
                    id: 'projectform.standard.placeholder',
                  })}
                  rows={4}
                />
              )}
            </FormItem>
            {this.props.location.query.method!=="update"?(
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="projectform.upload.label" />}
            >
              {getFieldDecorator('upload', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'projectform.upload.required',
                    }),
                  },
                ],
              })(
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>,
              )}
            </FormItem>):null}
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="projectform.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="projectform.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['projectForm/submitRegularForm'],
  }))(ProjectForm)
);
