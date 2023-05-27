import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import ReviewProducts from './components/ReviewItem';
import type { tabKeyType } from './data.d';
import Arbitration from './components/Arbitration';
import AllItem from './components/AllItem';
import AllOrder from './components/AllOrder';

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('1');

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === '1') {
      return <ReviewProducts key="1" />;
    }
    if (tabValue === '2') {
      return <Arbitration key="2" />;
    }
    if (tabValue === '3') {
      return <AllItem key="3" />;
    }
    if (tabValue === '4') {
      return <AllOrder key="4" />;
    }
    return null;
  };

  return (
    <div>
      <PageContainer
        tabList={[
          {
            key: '1',
            tab: '审核商品',
          },
          {
            key: '2',
            tab: '进行仲裁',
          },
          {
            key: '3',
            tab: '全部商品',
          },
          {
            key: '4',
            tab: '全部订单',
          },
        ]}
        fixedHeader
        tabActiveKey={tabKey}
        onTabChange={(_tabKey: string) => {
          setTabKey(_tabKey as tabKeyType);
        }}
      >
        {renderChildrenByTabKey(tabKey)}
      </PageContainer>
    </div>
  );
};
export default Center;
