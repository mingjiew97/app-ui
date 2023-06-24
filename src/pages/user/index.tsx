
import { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useRecoilState } from 'recoil';
import { AtList, AtListItem } from 'taro-ui';
import { userAtom } from '../../recoil';
import { cloudLogIn } from '../../api/user';
import { customLoading, customToast } from '../../components/common-components';
import CustomAvatar from './avatar';
import CustomNickname from './nick-name';
import { UserT } from '../../types';
import './index.scss';
import CustomDivider from '../../components/divider';

export default function User() {
  const [user, setUser] = useRecoilState<UserT>(userAtom);
  // login when user page is loaded
  useEffect(() => {
    // if the user is already logged in, do nothing
    if (user.openID !== '') {
      return;
    }
    console.log('user page is loaded');
    // else, login
    loginFunction(setUser);
  }, []);

  return (
    <View>
      <View className='user-info-container'>
        <CustomAvatar />
        <CustomNickname />
      </View>
      <CustomDivider content='关于我们' fontColor='black' />
      <View>
        <AtList>
          <AtListItem title='文案1' arrow='right' />
          <AtListItem title='文案2' extraText='详细信息' />
        </AtList>
      </View>
    </View>
  );
}

/**
 * login function; set user info to recoil state if login success
 * @param {function} setUser
 * @returns void
 */
const loginFunction = async (setUser: Function): Promise<void> => {
  const {showLoading, hideLoading} = customLoading();
  const {showToast} = customToast();

  // show loading
  showLoading('登录中...');
  const {code, userInfo, message} = await cloudLogIn();
  // hide loading
  hideLoading();

  if (code !== 200 || !userInfo) {
    // login failed
    showToast('登录失败', 'error', 1500);
    console.error(message);
    return;
  }

  // login success
  showToast('登录成功', 'success', 1500);
  // set user info to recoil state
  setUser({
    openID: userInfo.openID,
    nickName: userInfo.nickName,
    avatarUrl: userInfo.avatarUrl,
    userAccess: userInfo.userAccess,
  });
  return;
};