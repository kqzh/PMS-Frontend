import { Avatar, Card, Col, Dropdown, Form, Icon, List, Menu, Row, Select, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import numeral from 'numeral';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
const { Option } = Select;
const FormItem = Form.Item;

class UserProject extends Component {
  handleDelete = (key)=>{
    const {dispatch } = this.props;
    dispatch({
      type: 'userProject/remove',
      payload: {
        sid:key
      },
    })
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
      loading,
      form,
      myProjects
    } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ projectStatus, projectScore }) => (

      <div className={styles.cardInfo}>
        <div style={{textAlign:"center"}}>
          <p>完成进度</p>
          <p>{projectStatus}</p>
        </div>
        <div style={{textAlign:"center"}}>
          <p>项目分数</p>
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
                  <FormItem {...formItemLayout} label="作者">
                    {getFieldDecorator('author', {})(
                      <Select
                        placeholder="不限"
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >
                        <Option value="lisa">王昭君</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="学生班级">
                    {getFieldDecorator('class', {})(
                      <Select
                        placeholder="不限"
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >
                        <Option value="计算机174">计算机174</Option>
                        <Option value="计算机175">计算机175</Option>
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
                  <Tooltip key="edit" title="评分">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip key="calendar" title="查看进度">
                    <Icon type="calendar" />
                  </Tooltip>,

                  <Tooltip title="删除" key="delete" onClick={()=>this.handleDelete(item.sid)}>
                    <Icon type="delete" />
                  </Tooltip>,

                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    projectStatus={item.status}
                    projectScore={numeral(item.score).format('0,0')}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
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
