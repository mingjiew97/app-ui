import { View } from '@tarojs/components';
import CustomSearchBar from '../../components/search-bar';
import CustomSwiper from '../../components/swiper';
import { TabT } from '../../types';
import CustomTabs from '../../components/tab-bar';
import CustomGrid from '../../components/grid';
import './index.scss';
import CustomDivider from '../../components/divider';

export default function Index() {
  const list = [1, 2, 3];
  const tabList: TabT[] = [
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' },
  ];
  const gridList = [
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '区域1'
    },
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '区域2'
    },
    {
      image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      value: '区域3'
    },
  ];

  return (
    <View>
      <CustomSearchBar />
      <CustomSwiper swiperList={list} interval={3000} />
      <CustomGrid gridList={gridList} />
      <CustomDivider />
      <CustomTabs tabList={tabList} tabDirection='vertical' height='200px' />
    </View>
  );
}
