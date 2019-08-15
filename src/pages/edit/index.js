import dayjs from 'dayjs';

const app = getApp();
const { store } = app.globalData;
const { dispatch, subscribe, getState } = store;

let db = null;
const today = dayjs().format('YYYY-MM-DD');

Page({
  data: {
    modalObj: {
      type: 'add',
      currentObj: {
        date: today,
      },
    },
  },

  onLoad() {
    wx.cloud.init();
    db = wx.cloud.database();
    const { book: { modalObj } } = getState();
    this.setData({
      modalObj,
    });
  },

  onShow() {
    // this.getDates();
  },

  onTapCancel() {
    wx.navigateBack();
  },

  onTapConfirm() {
    const { modalObj } = this.data;
    const { currentObj, type } = modalObj;

    if (!!currentObj.name) {
      if(type === 'add') {
        this.addDate(currentObj);
      } else {
        console.log('edit');
        this.editDate(currentObj);
      }
    } else {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000,
      });
    }

  },

  bindChange(e) {
    const { modalObj } = this.data;
    const { currentObj } = modalObj;
    console.log(e.detail.value, 'e.detail.value')
    this.setData({
      modalObj: {
        ...modalObj,
        currentObj: {
          ...currentObj,
          [e.currentTarget.dataset.key]: e.detail.value,
        }
      },
    })
  },

  addDate(obj) {
    const _this = this;
    const { _id, _openid, ...rest } = obj;
    db.collection('jinian').add({
      data: { ...rest },
      success: function(res) {
        console.log(res, 'add res')
        wx.showToast({
          title: '新增成功',
          icon: 'none',
          duration: 1000,
        });
        _this.onTapCancel();
      },
      fail: function(error) {
        console.log(error, 'add error');
        wx.showToast({
          title: '新增失败',
          icon: 'none',
          duration: 1000,
        });
      }
    })
  },

  editDate(obj) {
    const _this = this;
    const { _id, _openid, ...rest } = obj;
    db.collection('jinian').doc(_id).update({
      data: {
        ...rest
      },
      success: function(res) {
        console.log(res, 'edit res')
        wx.showToast({
          title: '编辑成功',
          icon: 'none',
          duration: 1000,
        });
        _this.onTapCancel();
      },
      fail: function(error) {
        console.log(error, 'edit error');
        wx.showToast({
          title: '编辑失败',
          icon: 'none',
          duration: 1000,
        });
      }
    })
  },

})
