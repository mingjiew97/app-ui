/* eslint-disable import/no-commonjs */
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const DB = cloud.database(); // 获取数据库的引用

// 更新用户信息云函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const { OPENID: SERVER_OPEN_ID } = wxContext;
  const { userInfo } = event;

  // check if the server open id is the same as the user open id
  if (SERVER_OPEN_ID !== userInfo.openID) {
    return {
      code: 403,
      message: '非法请求'
    };
  }

  // check if the user exists
  try {
    const { data } = await DB
      .collection('users') // 获取集合
      .where({
        openID: userInfo.openID,
      }) // 根据openID查询
      .get();

    // if the user does not exist, return 404 error
    if (data.length === 0) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    // if the user exists, update the user info
    const user_id = data[0]._id;
    await DB
      .collection('users')
      .doc(user_id)
      .update({
        data: {
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        }
      });

    // if the update is successful, return 200
    return {
      code: 200,
      message: '更新成功'
    };
  } catch (error) {
    // if the update is failed, return 500
    return {
      code: 500,
      message: '服务器错误, 更新失败'
    };
  };
};