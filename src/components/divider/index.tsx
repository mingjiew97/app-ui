import { View } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import './index.scss';

export default function CustomDivider({...rest}) {
  return (
    <View>
      <AtDivider {...rest} />
    </View>
  );
}