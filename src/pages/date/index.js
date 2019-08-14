Page({
  data: {
    dates: [],
  },
  onLoad() {
    wx.cloud.init();
  },
  onShow() {
    this.getDates();
  },
  getDates() {
    const _this = this;
    try {
      const db = wx.cloud.database();
      db.collection('jinian').where({
        need: true,
      }).get({
        success: (res) => {
          console.log(res, 'res')
          _this.setData({
            dates: res.data
          })
        }
      });
    } catch (error) {
      console.log(error, 'error')
    }
  },
})
