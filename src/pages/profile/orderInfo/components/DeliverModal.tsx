import { InboxOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form, Modal, message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { useEffect, useState } from 'react';
import { request } from 'umi';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: string;
}

const DeliverModal: React.FC<modalCtrl> = ({ open, setOpen, orderId }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const [form] = Form.useForm<{
    content: string;
    imgUrl: string;
  }>();

  return (
    <Modal
      title="发货"
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <ProForm<{
        content: string;
        imgUrl: string;
      }>
        form={form}
        autoFocusFirstInput
        onFinish={async (field) => {
          try {
            const response = await request<{
              data: boolean;
            }>('/api/order/status/delivery', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: { content: field.content, imgUrl: field.imgUrl, orderId },
            });
            if (response.data) {
              message.success('提交成功');
              return true;
            } else {
              message.error('提交失败，请重试');
              return false;
            }
          } catch (error) {
            message.error('提交失败，请重试');
            return false;
          }
        }}
        onFinishFailed={(errorInfo: any) => {
          console.log('提交失败:', errorInfo);
        }}
      >
        <ProFormText
          style={{ width: '50%' }}
          width="md"
          name="content"
          label="发货详情"
          rules={[{ required: true }]}
        />
      </ProForm>
      <Form.Item name="imgUrl" label="发货照片">
        <Dragger
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
          onDrop={(e) => {
            console.log('Dropped files', e.dataTransfer.files);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text" style={{ width: 'md', margin: 20 }}>
            点击或拖动文件以上传
          </p>
        </Dragger>
      </Form.Item>
    </Modal>
  );
};
export default DeliverModal;
