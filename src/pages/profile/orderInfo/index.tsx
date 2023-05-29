import {
  Card,
  Descriptions,
  Divider,
  Steps,
  Badge,
  Popover,
  Button,
  Image,
  Avatar,
  message,
  Rate,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import { request, useHistory, useModel, useParams, useRequest } from 'umi';
import { queryOrderInfo } from './service';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import styles from './style.less';
import {
  AlertOutlined,
  CheckOutlined,
  CommentOutlined,
  DeleteOutlined,
  DollarOutlined,
  RollbackOutlined,
  SendOutlined,
  SmileOutlined,
  StopOutlined,
  TransactionOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import MyModal from '@/components/Modal';
import CommentModal from './components/CommentModal';
import DeliverModal from './components/DeliverModal';

interface RouteParams {
  orderId: string;
}

const desc = ['极差', '差劲', '一般', '不错', '极好'];

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

  const [openComment, setOpenComment] = useState(false);
  const [openAfterSale, setOpenAfterSale] = useState(false);
  const [openRejectNego, setOpenRejectNego] = useState(false);
  const [openArbi, setOpenArbi] = useState(false);
  const [openRejectArbi, setOpenRejectArbi] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  //0:已下单 1:已发货 2:已签收 3.已评价 4:协商中 5:售后结束 6:协商失败 7:仲裁 8:买家已评价 9:卖家已评价

  const extra = <div className={styles.moreInfo}>订单金额: ¥{data?.orderDTO.item.price}</div>;

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

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    if (initialState && initialState.currentUser && initialState.currentUser.id)
      setCurrentUserId(initialState.currentUser.id);
  }, [initialState]);

  return (
    <PageContainer
      loading={loading}
      title="订单详情"
      className={styles.pageHeader}
      header={{
        subTitle: extra,
        extra: [
          <Button type="primary" icon={<RollbackOutlined />} onClick={handleGoBack}>
            返回上一级
          </Button>,

          initialState?.currentUser?.id != data?.seller.id ? (
            <Button key={5} icon={<CommentOutlined />}>
              联系卖家
            </Button>
          ) : (
            <Button key={12} icon={<CommentOutlined />}>
              联系买家
            </Button>
          ),

          data?.orderDTO.state === 0 && initialState?.currentUser?.id == data.seller.id ? (
            <Button key={1} icon={<SendOutlined />} onClick={() => setOpenDelivery(true)}>
              发货
              <DeliverModal
                open={openDelivery}
                setOpen={setOpenDelivery}
                orderId={orderId}
              ></DeliverModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 1 && initialState?.currentUser?.id == data.buyer.id ? (
            <Button
              key={2}
              icon={<DollarOutlined />}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/order/status/receive', {
                    method: 'GET',
                    params: { orderId },
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              确认收货
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 2 ||
          data?.orderDTO.state === 5 ||
          (data?.orderDTO.state === 8 && initialState?.currentUser?.id === data.seller.id) ||
          (data?.orderDTO.state === 9 && initialState?.currentUser?.id === data.buyer.id) ? (
            <Button key={3} icon={<SmileOutlined />} onClick={() => setOpenComment(true)}>
              评价对方
              <CommentModal
                open={openComment}
                setOpen={setOpenComment}
                currentUserId={currentUserId}
                orderId={orderId}
              ></CommentModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 2 && initialState?.currentUser?.id == data.buyer.id ? (
            <Button key={4} icon={<TransactionOutlined />} onClick={() => setOpenAfterSale(true)}>
              申请售后协商
              <MyModal
                open={openAfterSale}
                setOpen={setOpenAfterSale}
                displayMessage="协商原因"
                url="/api/order/status/applyNego"
                idPara={orderId}
              ></MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 4 && initialState?.currentUser?.id == data.seller.id ? (
            <Button
              key={5}
              icon={<CheckOutlined />}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/order/status/allowAfterSale', {
                    method: 'GET',
                    params: { orderId },
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              通过售后请求
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 4 && initialState?.currentUser?.id == data.seller.id ? (
            <Button key={6} icon={<StopOutlined />} onClick={() => setOpenRejectNego(true)}>
              驳回售后请求
              <MyModal
                open={openRejectNego}
                setOpen={setOpenRejectNego}
                displayMessage="驳回原因"
                url="/api/order/status/rejectNego"
                idPara={orderId}
              ></MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 6 && initialState?.currentUser?.id == data.buyer.id ? (
            <Button key={7} icon={<AlertOutlined />} onClick={() => setOpenArbi(true)}>
              申请管理员仲裁
              <MyModal
                open={openArbi}
                setOpen={setOpenArbi}
                displayMessage="申请仲裁原因"
                url="/api/order/status/applyArbi"
                idPara={orderId}
              ></MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 7 && initialState?.currentUser?.access == 'admin' ? (
            <Button
              key={8}
              icon={<CheckOutlined />}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/order/status/allowAfterSale', {
                    method: 'GET',
                    params: { orderId },
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              通过仲裁请求
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 7 && initialState?.currentUser?.access == 'admin' ? (
            <Button key={9} icon={<StopOutlined />} onClick={() => setOpenRejectArbi(true)}>
              驳回仲裁请求
              <MyModal
                open={openRejectArbi}
                setOpen={setOpenRejectArbi}
                displayMessage="驳回仲裁原因"
                url="/api/order/status/rejectArbi"
                idPara={orderId}
              ></MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === 0 ? (
            <Button key={10} icon={<TransactionOutlined />} onClick={() => setOpenCancel(true)}>
              取消订单
              <MyModal
                open={openCancel}
                setOpen={setOpenCancel}
                displayMessage="取消原因"
                url="/api/order/status/cancel"
                idPara={orderId}
              ></MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.orderDTO.state === -1 ? (
            <Button
              key={11}
              icon={<DeleteOutlined />}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/order/status/delete', {
                    params: { orderId },
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              删除订单
            </Button>
          ) : (
            ''
          ),
        ],
      }}
      content={
        <div style={{ textAlign: 'center' }}>
          <Card title="订单进度" style={{ marginBottom: 24 }}>
            <RouteContext.Consumer>
              {({ isMobile }) =>
                data?.orderDTO.state !== undefined ? (
                  data.orderDTO.state === -1 ? (
                    <b style={{ fontSize: 'large' }}>订单已取消</b>
                  ) : data.orderDTO.state <= 3 ? (
                    <Steps
                      direction={isMobile ? 'vertical' : 'horizontal'}
                      progressDot={customDot}
                      current={data?.orderDTO.state}
                    >
                      <Step title="已下单 " />
                      <Step title="已发货 " />
                      <Step title="已签收 " />
                      <Step title="已评价 " />
                    </Steps>
                  ) : data.orderDTO.state == 4 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>协商中</b>
                  ) : data.orderDTO.state == 5 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>售后结束</b>
                  ) : data.orderDTO.state == 6 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>协商失败</b>
                  ) : data.orderDTO.state == 7 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>仲裁中</b>
                  ) : data.orderDTO.state == 8 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>买家已评价</b>
                  ) : data.orderDTO.state == 9 ? (
                    <b style={{ fontSize: 'large', textAlign: 'center' }}>卖家已评价</b>
                  ) : (
                    ''
                  )
                ) : (
                  <b style={{ fontSize: 'large', textAlign: 'center' }}>无效状态</b>
                )
              }
            </RouteContext.Consumer>
          </Card>
        </div>
      }
    >
      {data?.buyer.credit ? (
        data.buyer.credit < 50 && initialState?.currentUser?.id !== data.buyer.id ? (
          <Card loading={loading} hoverable style={{ marginBottom: 24 }}>
            {' '}
            <b style={{ color: '#EC6F6A', fontSize: 'large' }}>
              <WarningOutlined style={{ marginRight: '10px' }} />
              该买家信用分较低，请注意！
            </b>
          </Card>
        ) : (
          ''
        )
      ) : (
        ''
      )}

      {data?.seller.credit ? (
        data.seller.credit < 50 && initialState?.currentUser?.id !== data.seller.id ? (
          <Card loading={loading} hoverable style={{ marginBottom: 24 }}>
            {' '}
            <b style={{ color: '#EC6F6A', fontSize: 'large' }}>
              <WarningOutlined style={{ marginRight: '10px' }} />
              该卖家信用分较低，请注意！
            </b>
          </Card>
        ) : (
          ''
        )
      ) : (
        ''
      )}
      <Card>
        <Descriptions title="订单信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="订单号">{data?.orderDTO.id}</Descriptions.Item>
          <Descriptions.Item label="收货人姓名">{data?.orderDTO.name}</Descriptions.Item>
          <Descriptions.Item label="收货人电话">{data?.orderDTO.tel}</Descriptions.Item>
          <Descriptions.Item label="下单时间">{data?.orderDTO.createTime} </Descriptions.Item>
          <Descriptions.Item label="交付时间">{data?.orderDTO.deliveryTime}</Descriptions.Item>
          <Descriptions.Item label="交付方式">{data?.orderDTO.delivery}</Descriptions.Item>
          <Descriptions.Item label="支付方式">{data?.orderDTO.payment}</Descriptions.Item>
          <Descriptions.Item label="交易地点">{data?.orderDTO.position}</Descriptions.Item>
          <Descriptions.Item label="订单备注">{data?.orderDTO.remark}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />

        {data && data?.orderDTO.message.length != 0 ? (
          <div>
            <Descriptions title="订单状态信息" style={{ marginBottom: 32 }}>
              {data.orderDTO.imgUrl !== null ? (
                <Descriptions.Item label="发货照片">
                  <Image width={200} src={data.orderDTO.imgUrl}></Image>
                </Descriptions.Item>
              ) : (
                ''
              )}
              <Descriptions.Item label="当前状态">
                {data.orderDTO.state == -1
                  ? '已取消'
                  : data.orderDTO.state == 0
                  ? '已下单'
                  : data.orderDTO.state == 1
                  ? '已发货'
                  : data.orderDTO.state == 2
                  ? '已签收'
                  : data.orderDTO.state == 3
                  ? '已评价'
                  : data.orderDTO.state == 4
                  ? '协商中'
                  : data.orderDTO.state == 5
                  ? '售后结束'
                  : data.orderDTO.state == 6
                  ? '协商失败'
                  : data.orderDTO.state == 7
                  ? '仲裁中'
                  : '无效'}
              </Descriptions.Item>
              {Object.entries(data.orderDTO.message).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>
                  {value}
                </Descriptions.Item>
              ))}
            </Descriptions>
            <Divider style={{ marginBottom: 32 }} />
          </div>
        ) : (
          ''
        )}

        {data?.buyer.id ? (
          data.buyer.id == initialState?.currentUser?.id ? (
            <div>
              <Descriptions title="卖家信息" style={{ marginBottom: 32 }}>
                <Descriptions.Item label="卖家姓名">
                  <div>
                    <Avatar
                      size="small"
                      className={styles.avatar}
                      src={data?.seller.imgUrl}
                      alt="avatar"
                    />
                    <span style={{ marginLeft: '10px' }}>{data?.seller.nickName}</span>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="卖家ID">{data?.seller.id}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{data?.seller.phone}</Descriptions.Item>
                <Descriptions.Item label="信用分">
                  <div>
                    <span style={{ marginRight: '10px' }}>{data?.seller.credit}/100</span>
                    <Rate
                      style={{ marginTop: '-10px' }}
                      allowHalf
                      tooltips={desc}
                      disabled
                      value={data?.seller.credit ? data?.seller.credit / 20 : 0}
                    />
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ marginBottom: 32 }} />
            </div>
          ) : (
            <div>
              <Descriptions title="买家信息" style={{ marginBottom: 32 }}>
                <Descriptions.Item label="买家姓名">
                  <div>
                    <Avatar
                      size="small"
                      className={styles.avatar}
                      src={data?.buyer.imgUrl}
                      alt="avatar"
                    />
                    <span style={{ marginLeft: '10px' }}>{data?.buyer.nickName}</span>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="买家ID">{data?.buyer.id}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{data?.buyer.phone}</Descriptions.Item>
                <Descriptions.Item label="信用分">
                  <div>
                    <span style={{ marginRight: '10px' }}>{data?.buyer.credit}/100</span>
                    <Rate
                      style={{ marginTop: '-10px' }}
                      allowHalf
                      tooltips={desc}
                      disabled
                      value={data?.buyer.credit ? data?.buyer.credit / 20 : 0}
                    />
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ marginBottom: 32 }} />
            </div>
          )
        ) : (
          ''
        )}
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.orderDTO.item.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品描述">{data?.orderDTO.item.description}</Descriptions.Item>
          <Descriptions.Item label="商品价格">¥ {data?.orderDTO.item.price}</Descriptions.Item>
          <Descriptions.Item label="商品图片">
            <Image width={200} src={data?.orderDTO.item.imgUrl} />
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default OrderInfo;
