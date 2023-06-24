import Taro from '@tarojs/taro';
import { UserAccess, userLogInResponse } from 'src/types';

/**
 * @description 注册用户
 * @param {string} userAccess 用户的权限
 * @returns {Promise<userLogInResponse>} 用户信息
 */
const cloudSignUp = async (userAccess: UserAccess): Promise<userLogInResponse> => {
  try {
    const { result } = await Taro.cloud.callFunction({
      name: 'signup',
      data: {
        userAccess,
      },
    });
    
    // check the result type; if its a string, throw an error
    if (typeof result === 'string') {
      throw new Error(result);
    }
    
    // 用户注册失败，抛出错误
    if (result?.code !== 200) {
      throw new Error(result?.message);
    }

    // 用户注册成功, 返回用户信息
    return {
      code: result.code,
      userInfo: result.data,
      message: result.message,
    };
  } catch (error) {
    const errorMessage = `SIGN UP ERROR: ${error.message || '用户注册失败'}`;
    return {
      code: 500,
      userInfo: undefined,
      message: errorMessage,
    };
  }
};

export default cloudSignUp;