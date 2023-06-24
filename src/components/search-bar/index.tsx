import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtSearchBar } from 'taro-ui';
import './index.scss';

export default function CustomSearchBar() {
  const [value, setValue] = useState('');

  return (
    <View>
      <AtSearchBar
        value={value}
        onChange={setValue}
      />
    </View>
  );
}