/* eslint-disable import/no-commonjs */
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const DB = cloud.database(); // 获取数据库的引用

// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const { OPENID } = wxContext;
  // input params
  const { userAccess } = event;
  // current TIME
  const currentTime = new Date().toUTCString();

  try {
    // 创建用户
    const result = await DB
      .collection('users') // 获取集合
      .add({
        data: {
          openID: OPENID,
          userAccess: userAccess,
          nickName: '微信用户',
          avatarUrl: '',
          createTime: currentTime,
          updatedTime: currentTime,
        },
      });

    console.log('result', result);
    // 返回用户信息
    return {
      code: 200,
      data: result,
      message: '注册成功',
    };
  } catch (error) {
    return {
      code: 500,
      data: null,
      message: '服务器错误, 注册失败',
    };
  }
};