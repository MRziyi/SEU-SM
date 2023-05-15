import {
  ModalForm,
  ProForm,
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { Form, message } from 'antd';

interface formButton {
  btn?: JSX.Element;
}

const UploadForm: React.FC<formButton> = ({ btn }) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
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
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="itemName"
          label="商品名称"
          tooltip="将作为标题用于搜索，请尽量准确"
          placeholder="请输入商品名称"
        />
        <ProFormMoney
          width="md"
          name="price"
          label="定价"
          locale="zh-CN"
          placeholder="请输入定价"
          min={0}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="description"
          label="描述"
          placeholder="请输入商品描述"
          tooltip="推荐写明成色、配件、购买日期等信息"
        />
        <ProFormUploadDragger label="商品图片" width="md" name="imgUrl"></ProFormUploadDragger>
      </ProForm.Group>
    </ModalForm>
  );
};
export default UploadForm;
