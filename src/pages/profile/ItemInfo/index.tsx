import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider, Rate, Button, Avatar, message } from 'antd';
import { useState } from 'react';
import { request, useHistory, useModel, useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';
import {
  CheckOutlined,
  CommentOutlined,
  DollarOutlined,
  FileAddOutlined,
  RollbackOutlined,
  StopOutlined,
} from '@ant-design/icons';
import styles from './style.less';
import OrderForm from './components/OrderForm';
import UpdateForm from './components/UpdateForm';

const desc = ['极差', '差劲', '一般', '不错', '极好'];

interface RouteParams {
  itemId: string;
}

const ItemInfo: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const { itemId } = useParams<RouteParams>();

  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  const { data, loading } = useRequest(() => {
    return queryItemInfo(itemId);
  });
  const [itemIdPara, setItemId] = useState('');

  const [open, setOpen] = useState(false);
  function showModal() {
    setOpen(true);
    setItemId(itemId);
  }

  const statusName = ['待审核', '已上架', '已被下单'];
  return (
    <PageContainer
      header={{
        title:
          data?.itemInfo.itemName +
          '——' +
          (data?.itemInfo?.status
            ? data?.itemInfo?.status === -1
              ? '已被下架'
              : statusName[data?.itemInfo.status]
            : ''),

        extra: [
          <Button type="primary" icon={<RollbackOutlined />} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,

          <Button key={5} icon={<CommentOutlined />}>
            联系卖家
          </Button>,

          initialState?.currentUser?.access == 'admin' ? (
            <Button
              key={1}
              icon={<StopOutlined />}
              onClick={async () => {
                try {
                  const newStatus = -1;
                  const response = await request<{
                    data: number;
                  }>('/api/item/status', {
                    method: 'POST',
                    body: JSON.stringify({ newStatus }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
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
              下架商品
            </Button>
          ) : (
            ''
          ),
          data?.itemInfo.status === 0 && initialState?.currentUser?.access == 'admin' ? (
            <Button
              key={2}
              icon={<CheckOutlined />}
              onClick={async () => {
                try {
                  const newStatus = 1;
                  const response = await request<{
                    data: number;
                  }>('/api/item/status', {
                    method: 'POST',
                    body: JSON.stringify({ newStatus }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
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
              审核通过
            </Button>
          ) : (
            ''
          ),
          initialState?.currentUser?.id == data?.ownerInfo.id ? (
            <Button key={3} icon={<FileAddOutlined />} onClick={showModal}>
              修改商品
              <UpdateForm {...{ open, setOpen }}></UpdateForm>
            </Button>
          ) : (
            ''
          ),
          initialState?.currentUser?.id != data?.ownerInfo.id &&
          initialState?.currentUser?.access == 'user' ? (
            <Button key={4} icon={<DollarOutlined />} onClick={showModal}>
              立即下单
              <OrderForm {...{ open, setOpen, itemIdPara }}></OrderForm>
            </Button>
          ) : (
            ''
          ),
        ],
      }}
    >
      <Card bordered={false} loading={loading}>
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.itemInfo.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品ID">{data?.itemInfo.itemId}</Descriptions.Item>
          <Descriptions.Item label="商品价格">{data?.itemInfo.price}</Descriptions.Item>
          <Descriptions.Item label="上架时间">{data?.itemInfo.uploadedTime}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="商品详情" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品图片">
            <Image width={200} src={data?.itemInfo.imgUrl} />
          </Descriptions.Item>
          <Descriptions.Item label="商品简介">{data?.itemInfo.description}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="卖家信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="卖家姓名">
            <Avatar
              size="small"
              className={styles.avatar}
              src={data?.itemInfo.ownerUrl}
              alt="avatar"
            />
            <span style={{ marginLeft: '10px' }}>{data?.ownerInfo.nickName}</span>
          </Descriptions.Item>
          <Descriptions.Item label="卖家ID">{data?.ownerInfo.id}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data?.ownerInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="信用分">
            <div>
              <span style={{ marginRight: '10px' }}>{data?.ownerInfo.credit}/100</span>
              <Rate
                style={{ marginTop: '-10px' }}
                allowHalf
                tooltips={desc}
                disabled
                value={data?.ownerInfo.credit ? data?.ownerInfo.credit / 20 : 0}
              />
            </div>
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default ItemInfo;
