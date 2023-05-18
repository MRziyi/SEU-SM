import { PageContainer } from '@ant-design/pro-layout';
import { Image, Card, Descriptions, Divider, Rate, Button, Avatar, Modal, message } from 'antd';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRequest } from 'umi';
import { queryItemInfo } from './service';
import { CommentOutlined, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './style.less';
import ProCard from '@ant-design/pro-card';
import ProForm, {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';

const desc = ['极差', '差劲', '一般', '不错', '极好'];

interface RouteParams {
  itemId: string;
}

const ItemInfo: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const { itemId } = useParams<RouteParams>();
  const [fetchedItemId, setFetchedItemId] = useState<string | undefined>(itemId);
  const formRef = useRef<ProFormInstance>();

  const { data, loading } = useRequest(
    () => {
      return queryItemInfo(fetchedItemId);
    },
    {
      ready: !!fetchedItemId,
    },
  );

  useEffect(() => {
    if (itemId) {
      setFetchedItemId(itemId);
    }
  }, [itemId]);

  return (
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <span>
            <Button type="primary" icon={<DollarOutlined />} size={'large'} onClick={showModal}>
              立即下单
            </Button>
            <Modal
              title="Title"
              width={700}
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <ProCard>
                <StepsForm<{
                  name: string;
                }>
                  formRef={formRef}
                  onFinish={async () => {
                    message.success('提交成功');
                  }}
                  formProps={{
                    validateMessages: {
                      required: '此项为必填项',
                    },
                  }}
                >
                  <StepsForm.StepForm<{
                    name: string;
                  }>
                    name="base"
                    title="创建实验"
                    stepProps={{
                      description: '这里填入的都是基本信息',
                    }}
                    onFinish={async () => {
                      console.log(formRef.current?.getFieldsValue());
                    }}
                  >
                    <ProFormText
                      name="name"
                      label="实验名称"
                      width="md"
                      tooltip="最长为 24 位，用于标定的唯一 id"
                      placeholder="请输入名称"
                      rules={[{ required: true }]}
                    />
                    <ProFormDatePicker name="date" label="日期" />
                    <ProFormDateRangePicker name="dateTime" label="时间区间" />
                    <ProFormTextArea
                      name="remark"
                      label="备注"
                      width="lg"
                      placeholder="请输入备注"
                    />
                  </StepsForm.StepForm>
                  <StepsForm.StepForm<{
                    checkbox: string;
                  }>
                    name="checkbox"
                    title="设置参数"
                    stepProps={{
                      description: '这里填入运维参数',
                    }}
                    onFinish={async () => {
                      console.log(formRef.current?.getFieldsValue());
                      return true;
                    }}
                  >
                    <ProFormCheckbox.Group
                      name="checkbox"
                      label="迁移类型"
                      width="lg"
                      options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
                    />
                    <ProForm.Group>
                      <ProFormText name="dbname" label="业务 DB 用户名" />
                      <ProFormDatePicker name="datetime" label="记录保存时间" width="sm" />
                      <ProFormCheckbox.Group
                        name="checkbox"
                        label="迁移类型"
                        options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
                      />
                    </ProForm.Group>
                  </StepsForm.StepForm>
                  <StepsForm.StepForm
                    name="time"
                    title="发布实验"
                    stepProps={{
                      description: '这里填入发布判断',
                    }}
                  >
                    <ProFormCheckbox.Group
                      name="checkbox"
                      label="部署单元"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      options={['部署单元1', '部署单元2', '部署单元3']}
                    />
                    <ProFormSelect
                      label="部署分组策略"
                      name="remark"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      initialValue="1"
                      options={[
                        {
                          value: '1',
                          label: '策略一',
                        },
                        { value: '2', label: '策略二' },
                      ]}
                    />
                    <ProFormSelect
                      label="Pod 调度策略"
                      name="remark2"
                      initialValue="2"
                      options={[
                        {
                          value: '1',
                          label: '策略一',
                        },
                        { value: '2', label: '策略二' },
                      ]}
                    />
                  </StepsForm.StepForm>
                </StepsForm>
              </ProCard>
            </Modal>
            <Button
              style={{ marginRight: '10%', marginLeft: '10%' }}
              type="primary"
              icon={<CommentOutlined />}
              size={'large'}
            >
              联系卖家
            </Button>

            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size={'large'}
              onClick={handleGoBack}
            >
              返回市场
            </Button>
          </span>
        </div>
      }
    >
      <Card bordered={false} loading={loading}>
        <Descriptions title="商品信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品名称">{data?.itemInfo.itemName}</Descriptions.Item>
          <Descriptions.Item label="商品ID">{data?.itemInfo.itemId}</Descriptions.Item>
          <Descriptions.Item label="商品价格">{data?.itemInfo.price}</Descriptions.Item>
          <Descriptions.Item label="上架时间">{data?.itemInfo.uploadedTime}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="商品详情" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="商品图片">
            <Image width={200} src={data?.itemInfo.imgUrl} />
          </Descriptions.Item>
          <Descriptions.Item label="商品简介">{data?.itemInfo.description}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="卖家信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="卖家姓名">
            <Avatar
              size="small"
              className={styles.avatar}
              src={data?.itemInfo.ownerUrl}
              alt="avatar"
            />
            <span style={{ marginLeft: '10px' }}>{data?.ownerInfo.nickName}</span>
          </Descriptions.Item>
          <Descriptions.Item label="卖家ID">{data?.ownerInfo.id}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data?.ownerInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="信用分">
            <div>
              <span style={{ marginRight: '10px' }}>{data?.ownerInfo.credit}/100</span>
              <Rate
                style={{ marginTop: '-10px' }}
                allowHalf
                tooltips={desc}
                disabled
                value={data?.ownerInfo.credit ? data?.ownerInfo.credit / 20 : 0}
              />
            </div>
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
      </Card>
    </PageContainer>
  );
};

export default ItemInfo;
