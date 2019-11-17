import { Button, Card, Icon, List, Typography } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { Link } from 'react-router-dom';
const { Paragraph } = Typography;

@connect(({ listCardList, loading }) => ({
  listCardList,
  loading: loading.models.listCardList,
}))
class ListCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listCardList/fetch',
      // payload: {
      //   count: 8,
      // },
    });
  }
  handleUpdate = (key)=>{
    const {listCardList} = this.props;
    this.props.history.push("/projectlist/form?method=update&id="+key);
  };
  handleDelete = (key)=>{
    const {dispatch } = this.props;
    dispatch({
      type: 'listCardList/remove',
      payload: {
           key,
      },
    })
  };
  render() {
    const {
      listCardList: { list },
      loading,
    } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          PMS is the best projects manage system.
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            系统简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            系统文档
          </a>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData = {};
    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[nullData, ...list]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1" onClick={()=>this.handleUpdate(item.id)} >编辑</a>,
                        <a key="option2" onClick={()=>this.handleDelete(item.id)}>删除</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  <Link to='/projectlist/form?method=add'><Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增项目
                  </Button></Link>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ListCardList;
