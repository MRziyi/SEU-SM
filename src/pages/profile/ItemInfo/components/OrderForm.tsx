import ProCard from '@ant-design/pro-card';
import {
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { Modal, message, Image } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { request } from 'umi';

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemIdPara: string;
}

const OrderForm: React.FC<modalCtrl> = ({ open, setOpen, itemIdPara }) => {
  const formRef = useRef<ProFormInstance>();

  const [method1, setMethod1] = useState('');
  const [method2, setMethod2] = useState('');

  useEffect(() => {
    console.log(itemIdPara);
    console.log(itemIdPara);
  }, [itemIdPara]);
  const changeDeliveryMethod = (e: any) => {
    setMethod1(e.target.value); //这个是用来控制 面交,代方,其他的状态量
  };
  const changePaymentMethod = (e: any) => {
    setMethod2(e.target.value); //这个是用来控制微信or支付宝的状态量
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Modal
      title="立即下单"
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
    >
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          formRef={formRef}
          onFinish={async (values) => {
            try {
              // 发送表单数据到服务器
              const response = await request<{
                data: boolean;
              }>('/api/order/create', {
                method: 'POST',
                body: JSON.stringify({ ...values, itemIdPara }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.data) {
                message.success('提交成功');
                handleCancel();
                // 执行其他操作...
              } else {
                message.error('提交失败');
              }
            } catch (error) {
              message.error('提交出错');
              console.error(error);
            }
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
            name="buyer"
            title="收货人信息"
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              return true;
            }}
          >
            <ProFormText
              name="name"
              label="收货姓名"
              width="md"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="tel"
              label="联系电话"
              width="md"
              placeholder="请输入电话"
              rules={[{ required: true }]}
            />
            <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
          </StepsForm.StepForm>
          <StepsForm.StepForm<{
            checkbox: string;
          }>
            name="hand"
            title="交付信息"
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              return true;
            }}
          >
            <ProFormRadio.Group
              name="position"
              label="交付位置"
              options={['梅园', '桃园', '橘园', '教学楼']}
              rules={[{ required: true }]}
            />
            <ProFormText name="place" label="具体地点" placeholder="请输入具体的交付地点" />
            <ProFormRadio.Group
              name="delivery"
              label="交付方式"
              options={['代放', '面交']}
              fieldProps={{
                value: method1,
                onChange: changeDeliveryMethod,
              }}
              rules={[{ required: true }]}
            />
            <ProFormDateTimePicker
              rules={[
                {
                  required: true,
                },
              ]}
              name="dateTime"
              label="日期与时间"
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="pay" title="支付">
            <ProFormRadio.Group
              name="payment"
              label="支付方式"
              rules={[
                {
                  required: true,
                },
              ]}
              options={['微信支付', '支付宝支付']}
              fieldProps={{
                value: method2,
                onChange: changePaymentMethod,
              }}
            />
            {method2 === '微信' && (
              <Image
                src="https://i.328888.xyz/2023/05/19/VfzIDH.png"
                alt="微信付款码"
                style={{ width: '200px', height: '200px' }}
              />
            )}
            {method2 === '支付宝' && (
              <Image
                src="https://i.328888.xyz/2023/05/19/Vf62fV.png"
                alt="支付宝付款码"
                style={{ width: '200px', height: '200px' }}
              />
            )}
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </Modal>
  );
};
export default OrderForm;
