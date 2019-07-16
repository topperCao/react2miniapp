
import getLaji from '../../api/laji'

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
    const { searchName } = this.data;
    try {
      const data = await getLaji(searchName)
      console.log(data, 'data')
      this.setData({
        result: data,
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
  getLaji() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'laji',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function(res) {
        console.log(res, 'res') // 3
      },
      fail: function(error) {
        console.log(error, 'err');
      }
    })
  }
})
