import { Button, View } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil';
import { UserT } from '../../types';
import './index.scss';
import { cloudUpdateUserInfo } from '../../api/user';
import { customLoading, customToast } from '../../components/common-components';

const DEFAULT_AVATAR_URL = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const DEFAULT_AVATAR_NICKNAME = '未登录';

export default function CustomAvatar(): JSX.Element {
  const {showToast} = customToast();
  const [user, setUser] = useRecoilState<UserT>(userAtom);
  const isUserLoggedIn = user.openID !== '';

  const handleChooseAvatar = async (e) => {
    const avatarURL = e?.detail?.avatarUrl || DEFAULT_AVATAR_URL;
    // if the avatar is not changed, do nothing
    if (avatarURL === user.avatarUrl) {
      return;
    }

    // update avatar
    const success = await updateCloudAvatar({
      openID: user.openID,
      avatarUrl: avatarURL,
    });
    
    if (success) {
      setUser({
        ...user,
        avatarUrl: avatarURL,
      });
    }
  };

  return (
    <View>
      <AtAvatar
        image={user.avatarUrl || DEFAULT_AVATAR_URL}
        text={isUserLoggedIn ? user.nickName : DEFAULT_AVATAR_NICKNAME}
        className='avatar'
      />
      {
        /* change avatar button, can only be displayed when the user is logged in */
        isUserLoggedIn && <View>
          <Button className='avatar-button' open-type='chooseAvatar' onChooseAvatar={handleChooseAvatar}>
            <AtIcon value='camera' size='20' />
          </Button>
        </View>
      }
    </View>
  );
}

/**
 * @description update avatar in cloud
 * @param {Partial<UserT>} userInfo
 * @returns {Promise<boolean>} whether the update is successful
 */
const updateCloudAvatar = async (userInfo: Partial<UserT>): Promise<boolean> => {
  const {showLoading, hideLoading} = customLoading();
  const {showToast} = customToast();

  // show loading
  showLoading('更新头像...');
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