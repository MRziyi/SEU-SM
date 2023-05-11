import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '东南大学二手市场',
  pwa: false,
  logo: 'https://i.328888.xyz/2023/05/11/iqxMVZ.png',
  iconfontUrl: '',
};

export default Settings;
