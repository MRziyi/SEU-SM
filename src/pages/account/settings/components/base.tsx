import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { request, useModel } from 'umi';

import styles from './BaseView.less';

const BaseView: React.FC = () => {
  const [form] = Form.useForm<{
    name: string;
    phone: string;
    imgUrl: string;
  }>();

  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        showUploadList={false}
        accept="image/*"
        customRequest={async (options: any) => {
          const data = new FormData();
          data.append('file', options.file);
          try {
            const response = await fetch('/api/upload/image', {
              method: 'POST',
              body: data,
            });
            if (response.ok) {
              response.json().then((res: any) => {
                options.onSuccess({ url: res.data }, new Response());
                form.setFieldsValue({ imgUrl: res.data });
              });
            } else {
              options.onError(new Error('上传失败'));
            }
          } catch (error) {
            console.error('上传图片出错:', error);
            options.onError(error);
          }
        }}
        onChange={async (info) => {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        }}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );

  //  获取用户信息
  const { initialState, loading } = useModel('@@initialState');

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm<{
              name: string;
              phone: string;
              imgUrl: string;
            }>
              form={form}
              layout="vertical"
              onFinish={async (values) => {
                try {
                  // 发送表单数据到服务器
                  const response = await request<{
                    data: boolean;
                  }>('/api/user/modify', {
                    method: 'POST',
                    body: JSON.stringify({ ...values }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                }
              }}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                name: initialState?.currentUser?.nickName,
                phone: initialState?.currentUser?.phone,
                imgUrl: initialState?.currentUser?.imgUrl,
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的电话!',
                  },
                ]}
              ></ProFormText>
              <ProFormText name="imgUrl" hidden></ProFormText>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={form.getFieldValue('imgUrl')} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
