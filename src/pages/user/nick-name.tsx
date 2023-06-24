import { Input, View } from '@tarojs/components';
import { useRecoilState } from 'recoil';
import { UserT } from '../../types';
import { userAtom } from '../../recoil';
import { customLoading, customToast } from '../../components/common-components';
import { cloudUpdateUserInfo } from '../../api/user';
import './index.scss';

const DEFAULT_NON_LOGGED_IN_NICKNAME = '未登录';

export default function CustomNickname(): JSX.Element {
  const [user, setUser] = useRecoilState<UserT>(userAtom);
  const isUserLoggedIn = user.openID !== '';

  const handleNickNameChange = async (e) => {
    const newNickName = e.detail.value;
    // if the nickname is not changed, do nothing
    if (newNickName === user.nickName) {
      return;
    }

    // update nickname
    const success = await updateCloudNickName({
      openID: user.openID,
      nickName: newNickName,
    });

    if (success) {
      setUser({
        ...user,
        nickName: newNickName,
      });
    }
  };

  return (
    <View className='user-name'>
      <Input
        className='nick-name-input'
        value={isUserLoggedIn ? user.nickName : DEFAULT_NON_LOGGED_IN_NICKNAME}
        type='nickname'
        onBlur={handleNickNameChange}
      />
    </View>
  );
}

/**
 * @description update nickname in cloud
 * @param {Partial<UserT>} userInfo
 * @returns {Promise<boolean>} whether the update is successful
 */
const updateCloudNickName = async (userInfo: Partial<UserT>): Promise<boolean> => {
  const {showLoading, hideLoading} = customLoading();
  const {showToast} = customToast();

  // show loading
  showLoading('更新昵称...');
  const success = await cloudUpdateUserInfo(userInfo);
  // hide loading
  hideLoading();

  if (!success) {
    // update failed
    showToast('更新失败', 'error', 1500);
    return false;
  }

  // update success
  return true;
};