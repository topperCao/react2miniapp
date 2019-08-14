Page({

  data: {
    phone: '',
    password:''
  },
  onLoad() {
    wx.cloud.init();
  },

  phoneInput :function (e) {
    this.setData({
      phone:e.detail.value
    })
  },


  passwordInput :function (e) {

    this.setData({

      password:e.detail.value

    })

  },
  login() {
    const { phone, password } = this.data;
    if(phone.length == 0 || password.length == 0){
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '正在登录...',
        icon: 'loading',
        duration: 0,
      })
      try {
        const db = wx.cloud.database();
        db.collection('users').doc(`user-${phone}`).get({
          success: function(res) {
            wx.hideToast();
            const { data } = res;
            if (data.password === password) {
              wx.setStorageSync('isDateLogin', true);
              wx.navigateBack()
            } else {
              wx.showToast({
                title: '用户名和密码不一致',
                icon: 'none',
                duration: 1000,
              })
            }
          },
          fail: function(error) {
            wx.showToast({
              title: '用户名不存在',
              icon: 'none',
              duration: 1000,
            })
          }
        });
      } catch (error) {
        console.log(error, 'error')
      }

    }
  }
})
