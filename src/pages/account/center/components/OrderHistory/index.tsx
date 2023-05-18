import { Avatar, Card, List, Typography } from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import moment from 'moment';
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
    (values: any) => {
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
      renderItem={(item) => (
        <Link to={`/order/order-info/${item.id}`}>
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.item.itemName} src={item.item.imgUrl} />}
            >
              <Card.Meta
                title={<a>{item.item.itemName}</a>}
                description={<Paragraph className={styles.item}>{item.item.description}</Paragraph>}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.item.uploadedTime).fromNow()}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{item.item.ownerName}</span>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={item.item.ownerUrl}
                    alt="avatar"
                  />
                </div>
              </div>
            </Card>
          </List.Item>
        </Link>
      )}
    />
  );
};

export default OrderHistory;
