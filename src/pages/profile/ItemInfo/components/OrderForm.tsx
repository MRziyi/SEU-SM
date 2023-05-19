import ProCard from '@ant-design/pro-card';
import {
  ProFormInstance,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
} from '@ant-design/pro-form';
import { Modal, message } from 'antd';
import { useRef, useState, useEffect } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passId: string;
}

const OrderForm: React.FC<modalCtrl> = ({ open, setOpen, passId }) => {
  const formRef = useRef<ProFormInstance>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [method1, setMethod1] = useState('');
  const [method2, setMethod2] = useState('');

  /*const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };*/
  useEffect(() => {
    console.log(passId);
    console.log(passId);
  }, [passId]);
  const handleRadioChange1 = (e: any) => {
    setMethod1(e.target.value); //这个是用来控制 面交,代方,其他的状态量
  };
  const handleRadioChange2 = (e: any) => {
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
      //onOk={handleOk}
      confirmLoading={confirmLoading}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
    >
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          formRef={formRef}
          onFinish={async (values) => {
            await waitTime(2000);
            try {
              // 发送表单数据到服务器
              const response = await fetch('/api/order/create', {
                method: 'POST',
                body: JSON.stringify({ ...values, passId }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.ok) {
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
            stepProps={{
              description: '这里填入收货人信息',
            }}
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              return true;
            }}
          >
            <ProFormText
              name="name"
              label="收货姓名"
              width="md"
              tooltip="最长为6位"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="tel"
              label="联系电话"
              width="md"
              tooltip="最长为 24 位"
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
            stepProps={{
              description: '这里填入交付信息',
            }}
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              return true;
            }}
          >
            <ProFormRadio.Group
              name="place"
              label="交付地点"
              options={['梅园', '桃园', '橘园', '教学楼']}
            />
            <ProFormRadio.Group
              name="method"
              label="交付方式"
              options={['代放', '面交', '其他']}
              fieldProps={{
                value: method1,
                onChange: handleRadioChange1,
              }}
            />
            {method1 === '其他' && (
              <ProFormText name="other" label="其他交付方式" placeholder="请输入其他交付方式" />
            )}
            <ProFormDatePicker name="date" label="日期" />
            <ProFormText name="time" label="时间" tooltip="24小时制" />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="pay"
            title="支付"
            stepProps={{
              description: '这里进行支付',
            }}
          >
            <ProFormRadio.Group
              name="choosepay"
              label="支付方式"
              rules={[
                {
                  required: true,
                },
              ]}
              options={['微信', '支付宝']}
              fieldProps={{
                value: method2,
                onChange: handleRadioChange2,
              }}
            />
            {method2 === '微信' && (
              <img
                src="https://i.328888.xyz/2023/05/19/VfzIDH.png"
                alt="微信"
                style={{ width: '200px', height: '200px' }}
              />
            )}
            {method2 === '支付宝' && (
              <img
                src="https://i.328888.xyz/2023/05/19/Vf62fV.png"
                alt="微信"
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
