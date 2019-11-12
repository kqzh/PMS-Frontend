import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { PureComponent } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { connect } from 'dva';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        待申请{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        正在做{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        已完成{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
          (8)
        </span>
      </span>
    ),
  },
];

@connect(({ loading, user }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Center extends PureComponent {
  // static getDerivedStateFromProps(
  //   props: centerProps,
  //   state: centerState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };
  input = undefined;

  componentDidMount() {
    const { dispatch,currentUser } = this.props;
    dispatch({
      type: 'center/fetch',
      payload:{
        username:currentUser.username
      }
    });
    // dispatch({
    //   type: 'center/fetchCurrent',
    //
    // });

  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };
  showInput = () => {
    this.setState(
      {
        inputVisible: true,
      },
      () => this.input && this.input.focus(),
    );
  };
  saveInputRef = input => {
    this.input = input;
  };
  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;

    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [
        ...newTags,
        {
          key: `new-${newTags.length}`,
          label: inputValue,
        },
      ];
    }

    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };
  renderChildrenByTabKey = tabKey => {
    if (tabKey === 'projects') {
      return <Projects status={0}/>;
    }

    if (tabKey === 'applications') {
      return <Projects status={1}/>;
    }

    if (tabKey === 'articles') {
      return <Projects status={2}/>;
    }

    return null;
  };

  render() {
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const { currentUser, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <br/>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      {/*<i className={styles.title} />*/}
                      学号： {currentUser.username}
                    </p>
                    <p>
                      {/*<i className={styles.group} />*/}
                     班级： {currentUser.className}
                    </p>

                  </div>
                  <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>课程</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
