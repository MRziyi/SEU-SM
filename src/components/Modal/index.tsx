import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayMessage: string;
  url: string;
  idPara?: string;
}

const MyModal: React.FC<modalCtrl> = ({ open, setOpen, displayMessage, url, idPara }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if (idPara !== undefined) setId(idPara);
  }, [idPara]);

  const [form] = Form.useForm<{
    field: string;
  }>();

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title={displayMessage}
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <ProForm<{
        field: string;
      }>
        form={form}
        autoFocusFirstInput
        onFinish={async (field) => {
          try {
            const response = await request<{
              data: boolean;
            }>(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: { field: field.field, id },
            });
            if (response.data) {
              message.success('提交成功');
              setOpen(false);
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
          name="field"
          label={displayMessage}
          placeholder="请输入相关信息"
          rules={[{ required: true }]}
        />
      </ProForm>
    </Modal>
  );
};
export default MyModal;
