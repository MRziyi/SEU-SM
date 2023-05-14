import {
  PlusOutlined,
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import OrderHistory from './components/OrderHistory';
import Commments from './components/Commments';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'orderHistory',
    tab: (
      <span>
        历史订单 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'commment',
    tab: (
      <span>
        评价 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('orderHistory');

  //  获取用户信息
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

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
          <ClusterOutlined
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
      return <OrderHistory />;
    }
    if (tabValue === 'commments') {
      return <Commments />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.imgUrl} />
                  <div className={styles.name}>{currentUser.nickName}</div>
                </div>
                {renderUserInfo(currentUser)}
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
