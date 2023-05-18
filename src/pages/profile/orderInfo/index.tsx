import {
  Card,
  Descriptions,
  Divider,
  Steps,
  Statistic,
  Badge,
  Popover,
  Button,
  Image,
  Avatar,
} from 'antd';
import type { FC } from 'react';
import { useHistory, useParams, useRequest } from 'umi';
import { queryOrderInfo } from './service';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import styles from './style.less';
import { DollarOutlined, UserOutlined } from '@ant-design/icons';

const orderState = ['已下单', '已付款', '已发货', '已签收'];

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

  const { data, loading } = useRequest(() => {
    return queryOrderInfo(orderId);
  });

  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="订单金额" value={data?.item.price} prefix="¥" />
    </div>
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
        耗时:2小时25分钟
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
      loading={loading}
      title="订单详情"
      className={styles.pageHeader}
      content={
        <div style={{ textAlign: 'center' }}>
          <span>
            {/* <Button type="primary" icon={} size={'large'} onClick={showModal}>
              申请售后
            </Button>
            <OrderForm {...{ open, setOpen }}></OrderForm> */}
            <Button
              style={{ marginRight: '10%', marginLeft: '30%' }}
              type="primary"
              icon={<DollarOutlined />}
              size={'large'}
            >
              确认收货
            </Button>

            <Button type="primary" icon={<UserOutlined />} size={'large'} onClick={handleGoBack}>
              返回个人中心
            </Button>
          </span>
        </div>
      }
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
                  current={data?.state}
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
      <Card>
        <Descriptions title="订单信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="订单号">{data?.id}</Descriptions.Item>
          <Descriptions.Item label="买家id">{data?.buyerId}</Descriptions.Item>
          <Descriptions.Item label="卖家id">{data?.sellerId}</Descriptions.Item>
          <Descriptions.Item label="卖家姓名">
            <Avatar size="small" className={styles.avatar} src={data?.item.ownerUrl} alt="avatar" />
            <span style={{ marginLeft: '10px' }}>{data?.item.ownerName}</span>
          </Descriptions.Item>
          <Descriptions.Item label="上架时间">{data?.createTime} </Descriptions.Item>
          <Descriptions.Item label="下单时间">{data?.updateTime}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.item.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品描述">{data?.item.description}</Descriptions.Item>
          <Descriptions.Item label="商品价格">¥ {data?.item.price}</Descriptions.Item>
          <Descriptions.Item label="商品图片">
            <Image width={200} src={data?.item.imgUrl} />
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default OrderInfo;
