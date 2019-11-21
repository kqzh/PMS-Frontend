import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import StandardTable from './components/StandardTable';
import UpdateForm from './components/UpdateForm';
import AddProjectForm from './components/AddProjectForm';
import styles from './style.less';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

/* eslint react/no-multi-comp:0 */
@connect(({ listTableList, loading }) => ({
  listTableList,
  myProjects:listTableList.projects,
  loading: loading.models.listTableList,
}))
class TableList extends Component {
  state = {
    modalVisible: false,
    projectModalVisible:false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };
  columns = [

    {
      title: '学生姓名',
      dataIndex: 'student_name',
    },
    {
      title: '学生学号',
      dataIndex: 'student_id',
    },
    {
      title: '学生班级',
      dataIndex: 'student_class',
      //align:center
      //  sorter: true,
      render: val => `${val} 班`,
      // mark to display a total number
      //needTotal: true,
    },
    {
      title: '账号状态',
      dataIndex: 'student_status',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
        {
          text: status[3],
          value: '3',
        },
      ],

      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Link  to={"/userproject?author="+record.student_id}>查看</Link>
          <Divider type="vertical" />
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          <Divider type="vertical" />
          <a  onClick={()=> this.handleRemoveClick(record)}>删除</a>

        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch,listTableList } = this.props;
    dispatch({
      type: 'listTableList/fetch',
    });
    dispatch({
      type:"listTableList/getProject"
    })
  }

  handleRemoveClick = (record) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/remove',
      payload: {
        key: [record.student_id],
      },
      callback: () => {
        console.log("delete success");
        message.success('删除成功');
      },
    });

  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'listTableList/fetch',
      payload: params,
    });
  };
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'listTableList/fetch',
      payload: {},
    });
  };
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows ,projectModalVisible} = this.state;
    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'listTableList/remove',
          payload: {
            key: selectedRows.map(row => row.student_id),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
            message.success('删除成功');
          },
        });
        break;
      case 'addProject':
        this.handleProjectModalVisible(projectModalVisible);
        break;
      case 'removeProject':
        this.handleProjectModalVisible(projectModalVisible);
        break;

      default:
        break;
    }
  };
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'listTableList/fetch',
        payload: values,
      });
    });
  };
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleProjectModalVisible = flag=>{
    this.setState({
      projectModalVisible: !flag,
    });
  };
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };
  handleAddProject = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/addProject',
      payload: {
       ...fields
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    message.success('添加成功~');
    this.handleModalVisible();
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/add',
      payload: {
        student_id: fields.student_id,
        student_name:fields.student_name,
        student_class:fields.student_class

      },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listTableList/update',
      payload: {
        student_id: fields.student_id,
        student_name: fields.student_name,
        student_class: fields.student_class,
        key: fields.key
      },
    });
    message.success('修改成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="学生学号">
              {getFieldDecorator('student_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生班级">
              {getFieldDecorator('student_class')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="计算机174">计算机174</Option>
                  <Option value="计算机175">计算机175</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>

            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      listTableList: { data },
      loading,
      myProjects
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues,projectModalVisible } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="addProject">添加项目</Menu.Item>
        {/*<Menu.Item key="removeProject">删除项目</Menu.Item>*/}
        <Menu.Item key="remove">删除学生</Menu.Item>

      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const projectMethods={
      handleAddProject :this.handleAddProject,
      handleProjectModalVisible: this.handleProjectModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      批量操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <AddProjectForm {...projectMethods} projectModalVisible={projectModalVisible}
                        myProjects={myProjects} keys={selectedRows}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(TableList);
