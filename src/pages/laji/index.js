
Page({
  data: {
    searchName: '',
    result: '',
    tempImagePath: null,
    imgSrc: null,
  },
  onLoad() {
    wx.cloud.init();
  },
  onClear() {
    this.setData({
      searchName: '',
      result: '',
      tempImagePath: null,
      imgSrc: [],
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
          resolve(res.result)
        },
        fail: function(error) {
          console.log(error, 'err');
          reject(error)
        }
      })
    })
  },
  getAR(image) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'arlaji',
        // 传给云函数的参数
        data: {
          image: image,
        },
        success: function(res) {
          console.log(res, 'resresres');
          resolve(res.result)
        },
        fail: function(error) {
          console.log(error, 'err');
          reject(error)
        }
      })
    })
  },
  takephoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const { tempFilePaths } = res;
        this.setData({
          imgSrc: tempFilePaths[0],
          result: '正在识别...',
        }, async () => {
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths[0], // 选择图片返回的相对路径
            encoding: 'base64', // 编码格式
            success: async res => { // 成功的回调
              const base64 = res.data;
              const { results = [] } = await this.getAR(base64)
              console.log(results, 'results')
              if(!Array.isArray(results) && results.length === 0) {
                this.setData({
                  result: '识别失败（真辣鸡～',
                })
                return;
              }
              try {
                const { type } = await this.getLaji(results[0].value)
                console.log(type, 'type')
                this.setData({
                  result: type,
                })
              } catch (error) {
                console.log(error, 'error');
              }
            }
          })

        })
      },
      fail: (error) => {
        console.log(error);
      },
    })
  }
})
