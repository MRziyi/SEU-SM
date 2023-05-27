import { InboxOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, Upload, message } from 'antd';
import { request } from 'umi';

const { Dragger } = Upload;
interface formButton {
  btn?: JSX.Element;
}

const UploadForm: React.FC<formButton> = ({ btn }) => {
  const [form] = Form.useForm<{
    itemName: string;
    price: string;
    description: string;
    imgUrl: string;
  }>();

  return (
    <ModalForm<{
      itemName: string;
      price: string;
      description: string;
      imgUrl: string;
    }>
      title="发布闲置"
      trigger={btn}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          const response = await request<{
            data: boolean;
          }>('/api/item/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: values,
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
        <Form.Item name="imgUrl" label="商品图片">
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
      </ProFormGroup>
    </ModalForm>
  );
};
export default UploadForm;
