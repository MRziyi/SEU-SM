import { useRequest } from 'umi';
import { Avatar, Card, List, Rate } from 'antd';
import React, { useState } from 'react';
import type { CommentData } from '../../data';
import { queryCommentList } from '../../service';
import stylesApplications from './index.less';

const desc = ['极差', '差劲', '一般', '不错', '极好'];

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

const Comments: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CommentData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);

  // 获取tab列表数据
  const { loading } = useRequest(
    (values: any) => {
      return queryCommentList();
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
    <List<CommentData>
      rowKey="commentId"
      loading={loading}
      className={stylesApplications.filterCardList}
      grid={{ gutter: 24, xxl: 3, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      dataSource={listData}
      pagination={paginationProps}
      renderItem={(item) => (
        <List.Item key={item.commentId}>
          <Card hoverable bodyStyle={{ paddingBottom: 20 }}>
            <Card.Meta
              avatar={<Avatar size="small" src={item.fromUserUrl} />}
              title={item.fromUserName}
            />
            <div className={stylesApplications.cardInfo}>
              <div>
                <p>评价：</p>
                <p>{item.centent}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p>
                  评分：
                  {item.rank ? <span className="ant-rate-text">{desc[item.rank - 1]}</span> : ''}
                </p>
                <span>
                  <Rate tooltips={desc} disabled value={item.rank} />
                </span>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Comments;
