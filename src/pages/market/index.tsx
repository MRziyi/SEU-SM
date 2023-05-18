import { Avatar, Button, Card, Col, Form, List, Row, Select, Typography } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { Link, useRequest } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ItemData } from './data.d';
import { queryList, searchList } from './service';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import UploadForm from './components/UploadForm/UploadForm';
import { useState } from 'react';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const Projects: FC = () => {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<ItemData[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);

  const { loading, run } = useRequest(
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
    const result = await searchList({ keyword: value });
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
                <span>{moment(item.uploadedTime).fromNow()}</span>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div>
      <PageContainer
        content={
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginRight: '10%' }}>
              <UploadForm
                btn={
                  <Button type="primary" icon={<ShopOutlined />} size={'large'}>
                    发布闲置
                  </Button>
                }
              />
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
          <Card bordered={false}>
            <Form
              layout="inline"
              onValuesChange={() => {
                // 表单项变化时请求数据
                // 模拟查询表单生效
                run();
              }}
            >
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem name="category">
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                    <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                    <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                    <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                  </TagSelect>
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="其它选项" grid last>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="作者" name="author">
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">王昭君</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="好评度" name="rate">
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="good">优秀</Option>
                        <Option value="normal">普通</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Projects;
