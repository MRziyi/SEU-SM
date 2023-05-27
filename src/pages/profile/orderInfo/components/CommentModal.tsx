import ProForm, { ProFormRate, ProFormText } from '@ant-design/pro-form';
import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
  orderId: string;
}

const CommentModal: React.FC<modalCtrl> = ({ open, setOpen, currentUserId, orderId }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title="评价"
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
        rate: number;
      }>
        autoFocusFirstInput
        onFinish={async (field) => {
          try {
            const response = await request<{
              data: boolean;
            }>('/api/comment/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: { content: field.content, rank: field.rate, currentUserId, orderId },
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
          label="评价内容"
          rules={[{ required: true }]}
        />
      </ProForm>
      <ProFormRate name="rate" label="评分" rules={[{ required: true }]}></ProFormRate>
    </Modal>
  );
};
export default CommentModal;
