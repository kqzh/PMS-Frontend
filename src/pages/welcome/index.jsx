import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, Fragment } from 'react';
import { Spin, Statistic ,Col,Row,Card,Icon} from 'antd';
import styles from './index.less';
import QueueAnim from 'rc-queue-anim';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
const data = [
  {
    month: "Jan",
    value: 51
  },
  {
    month: "Feb",
    value: 91
  },
  {
    month: "Mar",
    value: 34
  },
  {
    month: "Apr",
    value: 47
  },
  {
    month: "May",
    value: 63
  },
  {
    month: "June",
    value: 58
  },
  {
    month: "July",
    value: 56
  },
  {
    month: "Aug",
    value: 77
  },
  {
    month: "Sep",
    value: 99
  },
  {
    month: "Oct",
    value: 106
  },
  {
    month: "Nov",
    value: 88
  },
  {
    month: "Dec",
    value: 56
  }
];
const cols = {
  month: {
    range: [0, 1]
  }
};
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
<Fragment>
    <PageHeaderWrapper content="欢迎使用 Pro Mange 项目管理系统" className={styles.main}>

      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large"></Spin>
      </div>
    </PageHeaderWrapper>
  <div >
    <Row style={{backgroundColor:"white"}}>
      <QueueAnim type={"left"}>
        <Col span={10} style={{paddingTop:100}} key={"a"}>

          <Card title={"站点统计"} extra={<Icon type="question-circle" style={{color:'#1890ff'}} key={"a2"}/>}>
            <QueueAnim type={"left"}>
              <Statistic title="访问总量" value={112893} suffix="次" key={'a'}/>
              <Statistic
                title="近期活跃"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#1DA57A' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
                key={'b'}
              />
            </QueueAnim>
          </Card>

        </Col>
      </QueueAnim>
      <QueueAnim type={'left'}>
        <Col span={14} key={"a"}>
          <Chart height={500} data={data} scale={cols} forceFit>
            <Axis name="month" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="month*value" size={2} shape={"hv"} />
          </Chart>
        </Col>
      </QueueAnim>
    </Row>
  </div>
</Fragment>
  );
};
