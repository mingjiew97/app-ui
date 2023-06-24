/* eslint-disable import/no-commonjs */
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const DB = cloud.database(); // 获取数据库的引用

/**
 * 登陆云函数
 * @returns {object} 返回对象包含code、data和message
 */
exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const { OPENID } = wxContext;

  try {
    const { data } = await DB
      .collection('users') // 获取集合
      .where({
        openID: OPENID,
      }) // 根据openID查询
      .get();

    // 如果查询到了用户信息，直接返回
    if (data.length > 0) {
      return {
        code: 200,
        data: data[0],
        message: '登陆成功'
      };
    }

    // 如果没有查询到用户信息，返回404错误
    return {
      code: 404,
      data: null,
      message: '用户不存在'
    };
  } catch (error) {
    return {
      code: 500,
      data: null,
      message: '服务器错误, 登陆失败'
    };
  }
};