// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  console.log( event.a + event.b);
  return {
    sum: event.a + event.b,
  }
}
