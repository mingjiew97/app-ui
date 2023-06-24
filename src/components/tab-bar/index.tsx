import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.scss';

export default function CustomTabs({ tabList, ...rest }) {
  const [current, setCurrent] = useState(0);

  return (
    <View>
      <AtTabs current={current} tabList={tabList} onClick={setCurrent} {...rest}>
        {tabList.map((item, index) => renderTabPane(index, current, item))}
      </AtTabs>
    </View>
  );
}

const renderTabPane = (index, current, item) => {
  return (
    <AtTabsPane tabDirection='vertical' current={current} index={index}>
      <View style='font-size:18px;text-align:center;height:200px;'>{`${item.title}的内容`}</View>
    </AtTabsPane>
  );
};