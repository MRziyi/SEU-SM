import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { RouteChildrenProps } from 'react-router';
import ReviewProducts from './components/ReviewProducts';
import type { tabKeyType } from './data.d';
import Arbitration from './components/Arbitration';

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('reviewProducts');

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'reviewProducts') {
      return <ReviewProducts key="reviewProducts" />;
    }
    if (tabValue === 'arbitration') {
      return <Arbitration key="arbitration" />;
    }
    return null;
  };

  return (
    <div>
      <PageContainer
        tabList={[
          {
            key: 'reviewProducts',
            tab: '审核商品',
          },
          {
            key: 'arbitration',
            tab: '进行仲裁',
          },
        ]}
        fixedHeader
        tabActiveKey={'reviewProducts'}
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
