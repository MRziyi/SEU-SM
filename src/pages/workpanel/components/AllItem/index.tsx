import { Avatar, Card, List, Typography } from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import moment from 'moment';
import { queryAllList } from '../../service';
import type { ItemData } from '../../data';
import styles from './index.less';

const { Paragraph } = Typography;

const AllItem: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<ItemData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  // 获取列表数据
  const { loading } = useRequest(
    () => {
      return queryAllList();
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
    pageSizeOptions: [8, 16, 24, 32],
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
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/profile/item-info/${item.itemId}`}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.itemName} src={item.imgUrl} />}
            >
              <Card.Meta
                title={
                  <a>
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
                  </a>
                }
                description={<Paragraph className={styles.item}>{item.description}</Paragraph>}
              />
              <div className={styles.cardItemContent}>
                <span>{item.uploadTime}</span>
                <div className={styles.avatarList}>
                  <span style={{ marginRight: 10 }}>{item.ownerName}</span>
                  <Avatar size="small" className={styles.avatar} src={item.ownerUrl} alt="avatar" />
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default AllItem;
