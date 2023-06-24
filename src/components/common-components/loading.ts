import Taro from '@tarojs/taro';

/**
 * @description 自定义 loading 组件
 * @returns {object} showLoading: 显示 loading 的方法
 * @returns {object} hideLoading: 隐藏 loading 的方法
 */
const customLoading = (): {
    showLoading: ShowLoadingFuncT;
    hideLoading: HideLoadingFuncT;
} => {
  // 显示 loading
  const showLoading = (title: string): void => {
    Taro.showLoading({
      title,
    });
  };

  // 隐藏 loading
  const hideLoading = (): void => {
    Taro.hideLoading();
  };

  return {
    showLoading,
    hideLoading
  };
};

export default customLoading;

type ShowLoadingFuncT = (title: string) => void;
type HideLoadingFuncT = () => void;