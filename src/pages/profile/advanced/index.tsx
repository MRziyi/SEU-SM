import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { FC } from 'react';
import React, { Fragment, useState } from 'react';

import { useRequest } from 'umi';
import type { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';
import styles from './style.less';

const { Step } = Steps;

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="已发货 " />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="订单号">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="买家id">12345</Descriptions.Item>
        <Descriptions.Item label="卖家id">678910</Descriptions.Item>
        <Descriptions.Item label="创建时间">2023.5.17 </Descriptions.Item>
        <Descriptions.Item label="更新时间">2023.5.17</Descriptions.Item>
        <Descriptions.Item label="备注">七天内支持退换</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot: React.ReactNode, { status }: { status: string }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        <span>{dot}</span>
      </Popover>
    );
  }
  return dot;
};

type AdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};

const Advanced: FC = () => {
  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });
  const { data = {}, loading } = useRequest<{ data: AdvancedProfileData }>(queryAdvancedProfile);

  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };
  const onOperationTabChange = (key: string) => {
    seTabStatus({ ...tabStatus, operationKey: key });
  };

  return (
    <PageContainer
      title="订单详情"
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
    >
      <div className={styles.main}>
        <GridContent>
          <Card title="订单进度" style={{ marginBottom: 24 }}>
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  progressDot={customDot}
                  current={2}
                >
                  <Step title="已下单 " />
                  <Step title="已付款" />
                  <Step title="已发货" />
                  <Step title="已签收" />
                </Steps>
              )}
            </RouteContext.Consumer>
          </Card>
        </GridContent>
      </div>
      <Card bordered={false} loading={loading}>
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">1</Descriptions.Item>
          <Descriptions.Item label="商品ID">1</Descriptions.Item>
          <Descriptions.Item label="商品图片">1</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default Advanced;
