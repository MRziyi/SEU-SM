import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider, Rate, Button, Avatar } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';
import OrderForm from './components/OrderForm/OrderForm';
import { CommentOutlined, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './style.less';

const desc = ['极差', '差劲', '一般', '不错', '极好'];

interface RouteParams {
  itemId: string;
}

const ItemInfo: FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const { itemId } = useParams<RouteParams>();
  const [fetchedItemId, setFetchedItemId] = useState<string | undefined>(itemId);

  const { data, loading } = useRequest(
    () => {
      return queryItemInfo(fetchedItemId);
    },
    {
      ready: !!fetchedItemId,
    },
  );

  useEffect(() => {
    if (itemId) {
      setFetchedItemId(itemId);
    }
  }, [itemId]);

  return (
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <span style={{ marginRight: '10%' }}>
            <OrderForm
              btn={
                <Button type="primary" icon={<DollarOutlined />} size={'large'}>
                  立即下单
                </Button>
              }
            />
          </span>
          <span style={{ marginRight: '10%' }}>
            <Button
              style={{ marginRight: '10px' }}
              type="primary"
              icon={<CommentOutlined />}
              size={'large'}
            >
              联系卖家
            </Button>
            <Avatar
              size="small"
              className={styles.avatar}
              src={data?.itemInfo.ownerUrl}
              alt="avatar"
            />
            <span style={{ marginLeft: '10px' }}>{data?.ownerInfo.nickName}</span>

            <Button
              style={{ marginLeft: '6%' }}
              type="primary"
              icon={<ShoppingCartOutlined />}
              size={'large'}
              onClick={handleGoBack}
            >
              返回市场
            </Button>
          </span>
        </div>
      }
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
          <Descriptions.Item label="卖家姓名">{data?.ownerInfo.nickName}</Descriptions.Item>
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
