import Taro from '@tarojs/taro';

/**
 * @description 自定义 toast 组件
 * @returns {object} showToast: 显示 toast 的方法
 * @returns {object} hideToast: 隐藏 toast 的方法
 */
const customToast = (): {
    showToast: ShowToastFuncT;
    hideToast: HideToastFuncT;
} => {
  // 显示 toast
  const showToast = (title: string, icon: ToastIconT, duration: number=1500): void => {
    Taro.showToast({
      title,
      icon,
      duration,
    });
  };

  // 隐藏 toast
  const hideToast = (): void => {
    Taro.hideToast();
  };

  return {
    showToast,
    hideToast
  };
};

export default customToast;

type ShowToastFuncT = (title: string, icon: ToastIconT, duration?: number) => void;
type HideToastFuncT = () => void;
/**
 * 可选值：
 * - 'success': 显示成功图标，此时 title 文本最多显示 7 个汉字长度;
 * - 'error': 显示失败图标，此时 title 文本最多显示 7 个汉字长度;
 * - 'loading': 显示加载图标，此时 title 文本最多显示 7 个汉字长度;
 * - 'none': 不显示图标，此时 title 文本最多可显示两行 
 */
type ToastIconT = 'success' | 'error' | 'loading' | 'none';