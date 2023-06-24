import Taro from '@tarojs/taro';
import { UserT } from '../../types';

/**
 * @description 更新用户信息
 * @param {Partial<UserT>} userInfo 用户信息
 * @returns {Promise<boolean>} 用户信息更新成功返回 true, 否则返回 false
 */
const cloudUpdateUserInfo = async (userInfo: Partial<UserT>): Promise<boolean> => {
  try {
    const { result } = await Taro.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        userInfo,
      },
    });

    // check the result type; if its a string, throw an error
    if (typeof result === 'string') {
      throw new Error(result);
    }
     
    // 用户更新失败，抛出错误
    if (result?.code !== 200) {
      throw new Error(result?.message);
    }

    // 用户更新成功, 返回成功
    return true;
  } catch (error) {
    return false;
  }    
};

export default cloudUpdateUserInfo;