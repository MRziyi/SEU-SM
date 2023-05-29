import { Link, useRequest } from 'umi';
import { Avatar, Card, Descriptions, List, Rate } from 'antd';
import React, { useState } from 'react';
import type { OrderData } from '../../data';
import { queryArbiList } from '../../service';
import stylesApplications from './index.less';

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        />
      </span>
    );
  }
  return result;
}

function showTotal(total: number, range: [number, number]) {
  return `${range[0]}-${range[1]} 共 ${total} 件`;
}

const Arbitration: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<OrderData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);

  // 获取tab列表数据
  const { loading } = useRequest(
    () => {
      return queryArbiList();
    },
    {
      onSuccess: (result) => {
        setTotalNum(result.totalNum);
        setListData(result.list);
      },
    },
  );

  const paginationProps = {
    onChange: changePage,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [4, 8, 16, 2],
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
  };

  function changePage(_page: number, _pageSize: number) {
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  return (
    <List<OrderData>
      rowKey="id"
      loading={loading}
      className={stylesApplications.filterCardList}
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={listData}
      pagination={paginationProps}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Link to={`/profile/order-info/${item.id}`}>
            <Card hoverable bodyStyle={{ paddingBottom: 20 }}>
              <Card.Meta avatar={<Avatar size="large" src={item.imgUrl} />} title={item.name} />
              <div className={stylesApplications.cardInfo}>
                <div>
                  <p>协商记录：</p>
                  <div>
                    <Descriptions title="订单状态信息" style={{ marginBottom: 32 }}>
                      {Object.entries(item.message).map(([key, value]) => (
                        <Descriptions.Item key={key} label={key}>
                          {value}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};
export default Arbitration;
