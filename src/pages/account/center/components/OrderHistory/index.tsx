import { Avatar, Card, List, Typography } from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import { queryOrderList } from '../../service';
import type { OrderData } from '../../data';
import styles from './index.less';

const { Paragraph } = Typography;

const OrderHistory: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<OrderData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  // 获取列表数据
  const { loading } = useRequest(
    () => {
      return queryOrderList();
    },
    {
      onSuccess: (result: any) => {
        setTotalNum(result.totalNum);
        setListData(result.list);
      },
    },
  );

  function changePage(_page: number, _pageSize: number) {
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 件`;
  }
  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [6, 12, 18, 24],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  return (
    <List<OrderData>
      className={styles.coverCardList}
      rowKey="id"
      loading={loading}
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(order) => (
        <List.Item>
          <Link to={`/profile/order-info/${order.id}`}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={order.item.itemName} src={order.item.imgUrl} />}
            >
              <Card.Meta
                title={
                  <a>
                    {order.item.itemName}——
                    {order.state == -1
                      ? '已取消'
                      : order.state == 0
                      ? '已下单'
                      : order.state == 1
                      ? '已发货'
                      : order.state == 2
                      ? '已签收'
                      : order.state == 3
                      ? '已评价'
                      : order.state == 4
                      ? '协商中'
                      : order.state == 5
                      ? '售后结束'
                      : order.state == 6
                      ? '协商失败'
                      : order.state == 7
                      ? '仲裁中'
                      : order.state == 8
                      ? '买家已评价'
                      : order.state == 9
                      ? '卖家已评价'
                      : '无效'}
                  </a>
                }
                description={
                  <Paragraph className={styles.item}>{order.item.description}</Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{order.createTime}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{order.item.ownerName}</span>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={order.item.ownerUrl}
                    alt="avatar"
                  />
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default OrderHistory;
