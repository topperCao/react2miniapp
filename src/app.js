// import './utils/es6-promise';

//app.js
App({
  globalData: {

  },
  onLaunch: function(options) {
    this.getSettings();
  },
  getSettings: function() {
    const self = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              console.log('授权成功');
            }
          })
        }
      }
    })
  },
});
