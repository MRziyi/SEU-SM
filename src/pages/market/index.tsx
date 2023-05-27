import { Avatar, Button, Card, List, Typography } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { Link, useModel, useRequest } from 'umi';
import type { ItemData } from './data.d';
import { queryList, searchList } from './service';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import UploadForm from './components/UploadForm/UploadForm';
import { useState } from 'react';

const { Paragraph } = Typography;

const Projects: FC = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<ItemData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);

  const { loading } = useRequest(
    () => {
      return queryList();
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
    showSizeChanger: true,
    showQuickJumper: true,
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
    pageSizeOptions: [8, 16, 24, 36],
  };

  const handleFormSubmit = async (value: string) => {
    const result = await searchList({ description: value });
    setListData(result.data.list);
    setTotalNum(result.data.totalNum);
  };

  const cardList = listData && (
    <List<ItemData>
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <a>{item.itemName}</a>
                    <div className={styles.avatarList}>
                      <span style={{ fontSize: '13px', marginRight: '10px' }}>
                        {item.ownerName}
                      </span>
                      <Avatar
                        size="small"
                        className={styles.avatar}
                        src={item.ownerUrl}
                        alt="avatar"
                      />
                    </div>
                  </div>
                }
                description={
                  <div>
                    <b style={{ color: 'darkblue', fontWeight: 'bolder', fontSize: '15px' }}>
                      ¥ {item.price}
                    </b>
                    <Paragraph
                      style={{ marginTop: 3, whiteSpace: 'pre-wrap' }}
                      className={styles.item}
                      ellipsis={false}
                    >
                      {item.description}
                    </Paragraph>
                  </div>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{item.uploadTime}</span>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );

  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  const uploadForm = (
    <UploadForm
      btn={
        <Button type="primary" icon={<ShopOutlined />} size={'large'}>
          发布闲置
        </Button>
      }
    />
  );

  return (
    <div>
      <PageContainer
        content={
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginRight: '10%' }}>
              {initialState?.currentUser?.access !== 'admin' ? uploadForm : ''}
            </span>
            <Input.Search
              placeholder="请输入"
              enterButton="搜索"
              size="large"
              onSearch={handleFormSubmit}
              style={{ maxWidth: 522 }}
            />
          </div>
        }
      >
        <div className={styles.coverCardList}>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Projects;
