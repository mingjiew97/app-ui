import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import { useRecoilState } from 'recoil';
import { activeTabAtom } from '../recoil';
import './index.scss';

const TAB_BAR_PAGES = [
  {
    title: '首页',
    iconType: 'home',
    pagePath: '/pages/index/index',
  },
  {
    title: '个人中心',
    iconType: 'user',
    pagePath: '/pages/user/index',
  }
];

export default function CustomTabBar() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);
  
  const handleClick = (value: number) => {
    setActiveTab(value);
    // 拿到当前点击的 tab 的 pagePath，跳转到对应的页面
    const { pagePath } = TAB_BAR_PAGES[value];
    Taro.switchTab({ url: pagePath });
  };

  return (
    <AtTabBar
      tabList={TAB_BAR_PAGES}
      current={activeTab}
      onClick={handleClick}
    />
  );
}
