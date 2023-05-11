import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.producedByUndefined',
    defaultMessage: '东南大学Undefined小组出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'SEU-SM',
          title: 'SEU-SM',
          href: 'https://seu-sm.netlify.app',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/MRziyi/SEU-SM',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
