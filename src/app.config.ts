export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/user/index',
  ],
  window: {
    // backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    // navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    list: [
      {
        text: '首页',
        iconPath: 'assets/tab-bar-icons/home.png',
        selectedIconPath: 'assets/tab-bar-icons/home-active.png',
        pagePath: 'pages/index/index',
      },
      {
        text: '我的',
        iconPath: 'assets/tab-bar-icons/user.png',
        selectedIconPath: 'assets/tab-bar-icons/user-active.png',
        pagePath: 'pages/user/index',
      }
    ],
  },
});
