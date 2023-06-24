import { PropsWithChildren } from 'react';
import Taro, { useLaunch } from '@tarojs/taro';
import { RecoilRoot } from 'recoil'; // recoil 状态管理
import './app.scss';

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    // check if we are running in wechat cloud
    const wechatCloudEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
    if (wechatCloudEnv) {
      Taro.cloud.init();
    }
  });

  // children 是将要会渲染的页面
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default App;
