import { View , Swiper, SwiperItem } from '@tarojs/components';
import './index.scss';

export default function CustomSwiper({swiperList, ...rest}) {
  return (
    <View>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        autoplay
      >
        {swiperList.map(renderSwiperItem)}
      </Swiper>
    </View>
  );
}

const renderSwiperItem = (item) => {
  return (
    <SwiperItem key={item}>
      <View className='demo-text'>{`图片${item}`}</View>
    </SwiperItem>
  );
};