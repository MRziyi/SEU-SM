import { Avatar, Card, List, Typography } from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import moment from 'moment';
import { queryItemList } from '../../service';
import type { ItemData } from '../../data';
import styles from './index.less';

const { Paragraph } = Typography;

const MyPublish: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<ItemData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  // 获取列表数据
  const { loading } = useRequest(
    () => {
      return queryItemList();
    },
    {
      onSuccess: (result) => {
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
    <List<ItemData>
      className={styles.coverCardList}
      rowKey="itemId"
      loading={loading}
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(item) => (
        <Link to={`/profile/item-info/${item.itemId}`}>
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.itemName} src={item.imgUrl} />}
            >
              <Card.Meta
                title={
                  <a>
                    {item.itemName}——
                    {item.status == -1
                      ? '已下架'
                      : item.status == 0
                      ? '待审核'
                      : item.status == 1
                      ? '已上架'
                      : item.status == 2
                      ? '已被下单'
                      : '无效'}
                  </a>
                }
                description={<Paragraph className={styles.item}>{item.description}</Paragraph>}
              />
              <div className={styles.cardItemContent}>
                <span>{item.uploadedTime}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{item.ownerName}</span>
                  <Avatar size="small" className={styles.avatar} src={item.ownerUrl} alt="avatar" />
                </div>
              </div>
            </Card>
          </List.Item>
        </Link>
      )}
    />
  );
};

export default MyPublish;
