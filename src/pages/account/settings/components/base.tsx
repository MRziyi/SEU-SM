import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.imgUrl) {
        return currentUser.imgUrl;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone,
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
              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在省!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }
                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  { validator: validatorPhone },
                ]}
              >
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
