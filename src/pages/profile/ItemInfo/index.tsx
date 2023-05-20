import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider, Rate, Button, Avatar } from 'antd';
import { useState } from 'react';
import { useHistory, useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';
import {
  CommentOutlined,
  DollarOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  UserOutlined,
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

  const { data, loading } = useRequest(() => {
    return queryItemInfo(itemId);
  });
  const [itemIdPara, setItemId] = useState('');

  const [open, setOpen] = useState(false);
  function showModal() {
    setOpen(true);
    setItemId(itemId);
    console.log(itemId);
  }

  const contentForCustomer = (
    <div style={{ textAlign: 'center' }}>
      <span>
        <Button type="primary" icon={<DollarOutlined />} size={'large'} onClick={showModal}>
          立即下单
        </Button>
        <OrderForm {...{ open, setOpen, itemIdPara }}></OrderForm>
        <Button
          style={{ marginRight: '10%', marginLeft: '10%' }}
          type="primary"
          icon={<CommentOutlined />}
          size={'large'}
        >
          联系卖家
        </Button>

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          size={'large'}
          onClick={handleGoBack}
        >
          返回市场
        </Button>
      </span>
    </div>
  );

  const contentForSeller = (
    <div style={{ textAlign: 'center' }}>
      <span>
        <Button
          type="primary"
          style={{ marginRight: '10%' }}
          icon={<FileAddOutlined />}
          size={'large'}
          onClick={showModal}
        >
          修改商品
        </Button>
        <UpdateForm {...{ open, setOpen }}></UpdateForm>

        <Button type="primary" icon={<UserOutlined />} size={'large'} onClick={handleGoBack}>
          返回个人中心
        </Button>
      </span>
    </div>
  );

  return (
    //TODO：全局变量获取个人身份信息进行判断
    <PageContainer content={itemId !== data?.ownerInfo.id ? contentForCustomer : contentForSeller}>
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
