import { Avatar, Card, Col, Dropdown, Form, Icon, List, Menu, Row, Select, Tooltip } from 'antd';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import numeral from 'numeral';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import CreateForm from '../UserList/components/CreateForm';
import ProjectScore from './components/ProjectScore';
import Input from 'antd/es/input';
import { Link } from 'react-router-dom';
const { Option } = Select;
const FormItem = Form.Item;

class UserProject extends Component {
  state={
    scoreVisible:false,
    selectProject:{
      id:-1,
      pid:-1
    },
    status:"",
    author:""
  };
  handleDelete = (student_id,pid)=>{
    const {dispatch } = this.props;
    dispatch({
      type: 'userProject/remove',
      payload: {
        student_id,
        pid
      },
    })
  };
  handleScoreModalVisible = (flag,student_id,pid) => {
    if (student_id !==undefined){
      this.setState({
        selectProject:{
          student_id,
          pid
        },
      })
    }
    this.setState({
      scoreVisible: !flag,
    });
  };
  handleScore = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userProject/score',
      payload: {
        ...fields
      },
    });
  };
  componentDidMount() {
    const { dispatch ,location} = this.props;

    dispatch({
      type:'userProject/getProject'
    });
    dispatch({
      type: 'userProject/fetch',
      payload: {
        ...location.query
      },
    });
  }

  render() {
    const {
      userProject: { list },
      userProject: { params },
      loading,
      form,
      myProjects
    } = this.props;
    const {author,status} = this.state;
    const { getFieldDecorator } = form;
    const projectMethods={
      handleScore :this.handleScore,
      handleScoreModalVisible: this.handleScoreModalVisible,
    };
    const myStatus=["未申请","已申请","第一周","第二周","已提交"];
    const CardInfo = ({ projectStatus, projectScore,student_name,student_class}) => (

      <div className={styles.cardInfo} >
      <div style={{textAlign:"center",marginBottom:"5px"}}>
          <p >{"学生姓名"}</p>
          <p style={{fontSize:14}}>{student_name}</p>
      </div >

        <div style={{textAlign:"center",marginBottom:"5px"}}>
          <p>完成进度</p>
          <p style={{fontSize:14}}>{myStatus[projectStatus]}</p>
        </div>
        <div style={{textAlign:"center"}}>
          <p >{"学生班级"}</p>
          <p style={{fontSize:12}}>{student_class}</p>
        </div>
        <div style={{textAlign:"center"}}>
          <p>项目评分</p>
          <p>{projectScore}</p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="所属项目"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    {
                      myProjects.map(item=>{
                        return <TagSelect.Option value={item.id} key={item.id}>{item.title}</TagSelect.Option>
                      })
                    }

                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="学生学号">
                    {getFieldDecorator('author', {
                      initialValue:params.author
                    })(
                      <Input
                        placeholder="不限"
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >

                      </Input>,
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="完成进度">
                    {getFieldDecorator('status', {
                      initialValue: params.status
                    })(
                      <Select
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >
                        <Option value="">不限</Option>
                        <Option value="0">未申请</Option>
                        <Option value="1">第一周</Option>
                        <Option value="2">第二周</Option>
                        <Option value="3">已提交</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <br />
        <List
          rowKey="key"
          grid={{
            gutter: 24,
            xl: 4,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          loading={loading}
          dataSource={list}

          renderItem={item => (
            <List.Item key={item.key}>
              <Card
                hoverable
                bodyStyle={{
                  paddingBottom: 20,
                }}
                actions={[
                  <Tooltip key="edit" title="评分" onClick={()=>this.handleScoreModalVisible(this.state.scoreVisible,item.student_id,item.pid)}>
                    <Icon type="edit" />
                  </Tooltip>,
                  <Link to ={ "userproject/detail?pid="+item.pid+"&student_id="+item.student_id}><Tooltip key="calendar" title="查看进度">
                    <Icon type="calendar" />
                  </Tooltip></Link>,

                  <Tooltip title="删除" key="delete" onClick={()=>this.handleDelete(item.student_id,item.pid)}>
                    <Icon type="delete" />
                  </Tooltip>,

                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    projectStatus={item.status}
                    projectScore={numeral(item.score).format('0,0')}
                    student_name={item.student_name}
                    student_class = {item.student_class}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
        <ProjectScore {...projectMethods} scoreVisible={this.state.scoreVisible} select={this.state.selectProject}/>
      </div>

    );
  }
}


const WarpForm = Form.create({
  onValuesChange({ dispatch },props) {
    //console.log(props);
    // 表单项变化时请求数据
    // 模拟查询表单生效
    dispatch({
      type: 'userProject/getChange',
      payload: {
        ...props
      },
    });
  },
})(UserProject);
export default connect(({ userProject, loading }) => ({
  userProject,

  myProjects:userProject.projects,
  loading: loading.models.userProject,
}))(WarpForm);
