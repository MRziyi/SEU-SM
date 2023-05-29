import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider, Rate, Button, message, Avatar } from 'antd';
import { useState } from 'react';
import { request, useHistory, useModel, useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';
import {
  CheckOutlined,
  CommentOutlined,
  DeleteOutlined,
  DollarOutlined,
  FileAddOutlined,
  RollbackOutlined,
  StopOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import OrderForm from './components/OrderForm';
import UpdateForm from './components/UpdateForm';
import MyModal from '@/components/Modal';
import styles from './style.less';

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
  const [openOrder, setOpenOrder] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [openPull, setOpenPull] = useState(false);
  //-1:已下架 0:待审核 1:已上架 2:已被下单

  return (
    <PageContainer
      loading={loading}
      header={{
        title:
          data?.itemInfo.itemName +
          '——' +
          (data?.itemInfo.status == -1
            ? '已被下架'
            : data?.itemInfo.status == 0
            ? '待审核'
            : data?.itemInfo.status == 1
            ? '已上架'
            : data?.itemInfo.status == 2
            ? '已被下单'
            : '无效'),

        extra: [
          <Button type="primary" icon={<RollbackOutlined />} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,

          initialState?.currentUser?.id != data?.ownerInfo.id ? (
            <Button key={5} icon={<CommentOutlined />}>
              联系卖家
            </Button>
          ) : (
            ''
          ),

          (data?.itemInfo.status == 0 || data?.itemInfo.status == -1) &&
          initialState?.currentUser?.id == data?.ownerInfo.id ? (
            <Button
              key={1}
              icon={<DeleteOutlined />}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/item/delete', {
                    params: { itemId },
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
              删除商品
            </Button>
          ) : (
            ''
          ),

          data?.itemInfo.status == 0 && initialState?.currentUser?.access == 'admin' ? (
            <Button key={1} icon={<StopOutlined />} onClick={() => setOpenPull(true)}>
              下架商品
              <MyModal
                open={openPull}
                setOpen={setOpenPull}
                displayMessage="下架理由"
                url="/api/item/status/pull"
                idPara={itemId}
              ></MyModal>
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
                  const response = await request<{
                    data: number;
                  }>('/api/item/status/allow', {
                    method: 'GET',
                    params: { itemId },
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
          initialState?.currentUser?.id == data?.ownerInfo.id &&
          (data?.itemInfo.status == -1 || data?.itemInfo.status == 0) ? (
            <Button key={3} icon={<FileAddOutlined />} onClick={() => setOpenModify(true)}>
              修改商品
              <UpdateForm
                open={openModify}
                setOpen={setOpenModify}
                itemPara={data?.itemInfo}
              ></UpdateForm>
            </Button>
          ) : (
            ''
          ),

          initialState?.currentUser?.id != data?.ownerInfo.id &&
          initialState?.currentUser?.access == 'user' ? (
            <Button key={4} icon={<DollarOutlined />} onClick={() => setOpenOrder(true)}>
              立即下单
              <OrderForm open={openOrder} setOpen={setOpenOrder} itemIdPara={itemId}></OrderForm>
            </Button>
          ) : (
            ''
          ),
        ],
      }}
    >
      {data?.ownerInfo?.credit ? (
        data.ownerInfo.credit < 50 && initialState?.currentUser?.id !== data.ownerInfo.id ? (
          <Card loading={loading} hoverable style={{ marginBottom: 24 }}>
            {' '}
            <b style={{ color: '#EC6F6A', fontSize: 'large' }}>
              <WarningOutlined style={{ marginRight: '10px' }} />
              该卖家信用分较低，请注意甄别！
            </b>
          </Card>
        ) : (
          ''
        )
      ) : (
        ''
      )}
      <Card loading={loading}>
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.itemInfo.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品ID">{data?.itemInfo.itemId}</Descriptions.Item>
          <Descriptions.Item label="商品价格">{data?.itemInfo.price} ¥</Descriptions.Item>
          <Descriptions.Item label="上架时间">{data?.itemInfo.uploadTime}</Descriptions.Item>
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
            <div>
              <Avatar
                size="small"
                className={styles.avatar}
                src={data?.ownerInfo.imgUrl}
                alt="avatar"
              />
              <span style={{ marginLeft: '10px' }}>{data?.ownerInfo.nickName}</span>
            </div>
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

        {data?.itemInfo.messages ? (
          <div>
            <Descriptions title="物品状态信息">
              {Object.entries(data.itemInfo.messages).map(([key, value]) => (
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
      </Card>
    </PageContainer>
  );
};

export default ItemInfo;
