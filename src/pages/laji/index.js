
// import getLaji from '../../api/laji'


Page({
  data: {
    searchName: '',
    result: '',
  },
  onLoad() {
    wx.cloud.init();
  },
  onClear() {
    this.setData({
      searchName: '',
      result: '',
    })
  },
  onInput(e) {
    const { result } = this.data;
    this.setData({
      searchName: e.detail.value,
      result: !!e.detail.value ? result : '',
    });
  },
  async onSearch() {
    this.setData({
        result: '正在查询...',
      })
    const { searchName } = this.data;
    try {
      const { type } = await this.getLaji(searchName)
      console.log(type, 'type')
      this.setData({
        result: type,
      })
    } catch (error) {
      console.log(error, 'error');
    }
  },
  gotoreact() {
    wx.navigateTo({
      url: '/pages/react/index',
    })
  },
  gotoindex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  getLaji(name) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'laji',
        // 传给云函数的参数
        data: {
          name: name,
        },
        success: function(res) {
          console.log(res, 'res') // 3
          resolve(res.result)
        },
        fail: function(error) {
          console.log(error, 'err');
          reject(error)
        }
      })
    })
  }
})
