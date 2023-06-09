import {
  ContactsOutlined,
  ClusterOutlined,
  PhoneOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import OrderHistory from './components/OrderHistory';
import Comments from './components/Comments';
import MyPublish from './components/MyPublish';
import type { CurrentUser, tabKeyType } from './data.d';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'orderHistory',
    tab: (
      <span>
        历史订单 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
  {
    key: 'myPublish',
    tab: (
      <span>
        我的发布 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
  {
    key: 'comments',
    tab: (
      <span>
        评价 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
];

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('orderHistory');

  //  获取用户信息
  const { initialState, loading } = useModel('@@initialState');

  //  渲染用户信息
  const renderUserInfo = ({ id, credit, phone }: Partial<CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          一卡通号: {id}
        </p>
        <p>
          <RadarChartOutlined
            style={{
              marginRight: 8,
            }}
          />
          信用分: {credit}
        </p>
        <p>
          <PhoneOutlined
            style={{
              marginRight: 8,
            }}
          />
          手机号: {phone}
        </p>
      </div>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'orderHistory') {
      return <OrderHistory key="orderHistory" />;
    }
    if (tabValue === 'myPublish') {
      return <MyPublish key="myPublish" />;
    }
    if (tabValue === 'comments') {
      return <Comments key="comment" />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && initialState?.currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={initialState.currentUser.imgUrl} />
                  <div className={styles.name}>{initialState.currentUser.nickName}</div>
                </div>
                {renderUserInfo(initialState.currentUser)}
                <Divider dashed />
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
