import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider } from 'antd';
import { FC } from 'react';
import { useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';

interface RouteParams {
  itemId: string;
}

const ItemInfo: FC = () => {
  const { itemId } = useParams<RouteParams>();

  const { data, loading } = useRequest(() => {
    return queryItemInfo(itemId);
  });

  return (
    <PageContainer>
      <Card bordered={false} loading={loading}>
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.Item.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品ID">{data?.Item.itemId}</Descriptions.Item>
          <Descriptions.Item label="商品价格">{data?.Item.price}</Descriptions.Item>
          <Descriptions.Item label="上架时间">{data?.Item.uploadedTime}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="商品详情" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品图片">
            <Image width={200} src={data?.Item.imgUrl} />
          </Descriptions.Item>
          <Descriptions.Item label="商品简介">{data?.Item.description}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="卖家信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="卖家姓名">{data?.OwnerInfo.nickName}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data?.OwnerInfo.id}</Descriptions.Item>
          {/* TODO: Butify */}
          <Descriptions.Item label="信用分">{data?.OwnerInfo.credit}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default ItemInfo;
