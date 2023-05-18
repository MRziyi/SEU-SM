import {
  Image,
  Card,
  Descriptions,
  Divider,
  Rate,
  Button,
  Input,
  Avatar,
  Steps,
  Statistic,
  Badge,
  Popover,
} from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRequest } from 'umi';
import { queryOrderInfo } from './service';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import OrderForm from './components/OrderForm/OrderForm';
import { CommentOutlined, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './style.less';

const orderstate = ['已下单', '已付款', '已发货', '已签收'];

interface RouteParams {
  orderId: string;
}

const { Step } = Steps;

const OrderInfo: FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const { orderId } = useParams<RouteParams>();
  const [fetchedorderId, setFetchedorderId] = useState<string | undefined>(orderId);

  const { data, loading } = useRequest(
    () => {
      return queryOrderInfo(fetchedorderId);
    },
    {
      ready: !!fetchedorderId,
    },
  );

  useEffect(() => {
    if (orderId) {
      setFetchedorderId(orderId);
    }
  }, [orderId]);

  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="状态" value={data?.OrderInfo.state && orderstate[data.OrderInfo.state]} />
      <Statistic title="订单金额" value={data?.OrderInfo.item.price} prefix="¥" />
    </div>
  );

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="订单号">{data?.OrderInfo.id}</Descriptions.Item>
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
        <Badge
          status="default"
          text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>}
        />
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

  return (
    <PageContainer
      title="订单详情"
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
    >
      <div className={styles.main}>
        <GridContent>
          <Card title="订单进度" style={{ marginBottom: 24 }}>
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  progressDot={customDot}
                  current={data?.OrderInfo.state}
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
          <Descriptions.Item label="商品名称">{data?.OrderInfo.item.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品ID">1</Descriptions.Item>
          <Descriptions.Item label="商品图片">1</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default OrderInfo;
