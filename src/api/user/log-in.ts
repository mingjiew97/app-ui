import Taro from '@tarojs/taro';
import { UserAccess, userLogInResponse } from '../../types';
import cloudSignUp from './sign-up';

/**
 * @description 用户登录, 如果用户不存在, 则注册用户
 * @returns {Promise<useLogInResponse>} 用户信息
 */
const cloudLogIn = async(): Promise<userLogInResponse> => {
  try {
    const { result } = await Taro.cloud.callFunction({
      name: 'login'
    });

    // check the result type; if its a string, throw an error
    if (typeof result === 'string') {
      throw new Error(result);
    }

    // 用户不存在，注册用户
    if (result?.code === 404) {
      const { code, userInfo, message } = await cloudSignUp( UserAccess.User);
      return {
        code,
        userInfo,
        message,
      };
    }
    
    // 用户登录失败，抛出错误
    if (result?.code !== 200) {
      throw new Error(result?.message);
    }

    // 用户登录成功, 返回用户信息
    return {
      code: result.code,
      userInfo: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error(error); 
    const errorMessage = `LOGIN ERROR: ${error.message || '用户登录失败'}`;
    return {
      code: 500,
      userInfo: undefined,
      message: errorMessage,
    };
  }
};

export default cloudLogIn;