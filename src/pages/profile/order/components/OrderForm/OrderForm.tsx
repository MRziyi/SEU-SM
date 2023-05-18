import {
  ModalForm,
  ProForm,
  ProFormItem,
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { request } from 'umi';

interface formButton {
  btn?: JSX.Element;
}

const OrderForm: React.FC<formButton> = ({ btn }) => {
  const CustomUpload = async (options: { onSuccess?: any; onError?: any; file?: any }) => {
    //const { file } = options;
    options.onSuccess({ url: 'http://test_for_upload' }, new Response());
    // try {
    //   const response = await request('https://imgloc.com/api/1/upload', {
    //     method: 'POST',
    //     data: {
    //       'image':file
    //     },
    //     headers: {
    //       'X-API-Key':
    //         'chv_2VWP_9c13ba3726dfdb28bd9bfc3b46d8254fefbf5bf911797ae1b2fd1f26905690479ca8116ccc30677010912eb66f4c7cec3b166f503368e86385625b80991a5fe1',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.code === 200) {
    //     options.onSuccess({ url: response.data.url }, new Response());
    //   } else {
    //     options.onError(new Error('上传失败'));
    //   }
    // } catch (error) {
    //   console.error('上传图片出错:', error);
    //   options.onError(error);
    // }
  };

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
            data: API.PublishResult;
          }>('/api/item/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: values,
          });
          if (response.data.ok) {
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
      <ProForm.Group>
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
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          style={{ width: 'md' }}
          width="md"
          name="description"
          label="描述"
          placeholder="请输入商品描述"
          tooltip="推荐写明成色、配件、购买日期等信息"
          rules={[{ required: true }]}
        />
        <ProFormUploadDragger
          name="inage"
          accept="image/*"
          fieldProps={{
            customRequest: CustomUpload,
            onChange: async (info) => {
              if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功`);
                form.setFieldsValue({ imgUrl: info.file.response.url });
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
              }
            },
          }}
          style={{ width: 'md' }}
          label="商品图片"
          width="md"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProFormItem name="imgUrl" hidden />{' '}
    </ModalForm>
  );
};
export default OrderForm;
