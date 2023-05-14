import { Button, Card, Col, Form, List, Row, Select, Typography } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { useRequest } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ItemData } from './data.d';
import { queryFakeList } from './service';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import UploadForm from './components/UploadForm/UploadForm';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const Projects: FC = () => {
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    return queryFakeList({
      count: 8,
    });
  });

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const list = data?.list || [];

  const cardList = list && (
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
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img alt={item.itemName} src={item.imgUrl} />}
          >
            <Card.Meta
              title={<a>{item.itemName}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.description}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.uploadedTime).fromNow()}</span>
              <div className={styles.avatarList}>
                <Paragraph className={styles.item} ellipsis={{ rows: 1 }}>
                  {item.ownerAvatarUrl}
                </Paragraph>
                {item.ownerName}
              </div>
            </div>
          </Card>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <UploadForm
              btn={
                <Button type="primary" icon={<ShopOutlined />} size={'large'}>
                  发布闲置
                </Button>
              }
            ></UploadForm>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Input.Search
                placeholder="请输入"
                enterButton="搜索"
                size="large"
                onSearch={handleFormSubmit}
                style={{ maxWidth: 522 }}
              />
            </div>
          </div>
        }
      >
        <div className={styles.coverCardList}>
          <Card bordered={false}>
            <Form
              layout="inline"
              onValuesChange={(_, values) => {
                // 表单项变化时请求数据
                // 模拟查询表单生效
                run(values);
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
