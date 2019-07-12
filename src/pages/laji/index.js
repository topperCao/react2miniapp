
import getLaji from '../../api/laji'

Page({
  data: {
    searchName: '',
    result: '',
  },
  onShow() {
    this.search('西瓜');
  },
  async search(name) {
    try {
      const data = await getLaji(name)
      console.log(data, 'data')
      wx.showToast({
        title: data,
        icon: 'none',
        duration: 1000,
      })
      this.setData({
        result: data,
      })
    } catch (error) {
      console.log(error, 'error');
    }
  }
})