import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
} from '@ant-design/pro-form';
import { Modal, message, Form, Upload, Button } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import { ItemData } from '../../data';
import { UploadOutlined } from '@ant-design/icons';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemPara?: ItemData;
}

const UpdateForm: React.FC<modalCtrl> = ({ open, setOpen, itemPara }) => {
  const [show, setShow] = useState(false);

  const [form] = Form.useForm<{
    itemName: string;
    price: string;
    description: string;
    imgUrl: string;
  }>();

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title="修改商品信息"
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <ProForm<{
        itemName: string;
        price: string;
        description: string;
        imgUrl: string;
      }>
        initialValues={{
          itemName: itemPara?.itemName,
          price: itemPara?.price,
          description: itemPara?.description,
          imgUrl: itemPara?.imgUrl,
        }}
        form={form}
        autoFocusFirstInput
        onFinish={async (values) => {
          try {
            const response = await request<{
              data: boolean;
            }>('/api/item/modify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                itemName: values.itemName,
                price: values.price,
                description: values.description,
                imgUrl: values.imgUrl,
                itemId: itemPara?.itemId,
              },
            });
            if (response.data) {
              message.success('提交成功');
              setShow(false);
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
        <ProFormGroup>
          <ProFormText
            style={{ width: '50%' }}
            width="md"
            name="itemName"
            label="商品名称"
            tooltip="将作为标题用于搜索，请尽量准确"
            placeholder="请输入商品名称"
            rules={[{ required: true }]}
          />
          <ProFormMoney
            style={{ width: '50%' }}
            width="md"
            name="price"
            label="定价"
            locale="zh-CN"
            placeholder="请输入定价"
            min={0}
            rules={[{ required: true }]}
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormTextArea
            style={{ width: 'md' }}
            width="md"
            name="description"
            label="描述"
            placeholder="请输入商品描述"
            tooltip="推荐写明成色、配件、购买日期等信息"
            rules={[{ required: true }]}
          />
          <Form.Item name="imgUrl" label="商品照片">
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
              <div>
                <Button>
                  <UploadOutlined />
                  修改商品照片
                </Button>
              </div>
            </Upload>
          </Form.Item>
        </ProFormGroup>
      </ProForm>
    </Modal>
  );
};
export default UpdateForm;
