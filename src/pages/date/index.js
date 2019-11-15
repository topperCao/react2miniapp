import dayjs from 'dayjs';
import _sortBy from 'lodash/sortBy'

const app = getApp();
const { store } = app.globalData;
const { dispatch, subscribe, getState } = store;

let db = null;
const today = dayjs().format('YYYY-MM-DD');

Page({
  data: {
    dates: [],
    modalObj: {
      visiable: false,
      type: 'add',
      currentObj: {
        date: today,
      },
    },
  },

  onLoad() {
    wx.cloud.init();
    db = wx.cloud.database();
  },

  onShow() {
    this.getDates();
  },

  onTapAdd() {
    const { modalObj } = this.data;
    // this.setData({
    //   modalObj: {...modalObj, visiable: true, type: 'add'},
    // })
    dispatch({
      type: 'book/setModalObj',
      payload: { type: 'add', currentObj: { date: today } },
    });
    wx.navigateTo({
      url: '/pages/edit/index',
    });
  },

  onTapEdit(event) {
    const { modalObj } = this.data;
    // this.setData({
    //   modalObj: {...modalObj, visiable: true, type: 'edit', currentObj: event.currentTarget.dataset.obj},
    // })
    dispatch({
      type: 'book/setModalObj',
      payload: { type: 'edit', currentObj: event.currentTarget.dataset.obj },
    });
    wx.navigateTo({
      url: '/pages/edit/index',
    });
  },

  onTapRead(event) {
    dispatch({
      type: 'book/setModalObj',
      payload: { type: 'read', currentObj: event.currentTarget.dataset.obj },
    });
    wx.navigateTo({
      url: '/pages/edit/index',
    });
  },

  onTapDelete(event) {
    const _this = this;
    const { obj } = event.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: `确定删除 '${obj.name}'？`,
      success (res) {
        if (res.confirm) {
          _this.deleteDate(obj);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  async getDates() {
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    try {
      const MAX_LIMIT = 20
      // 先取出集合记录总数
      const countResult = await db.collection('jinian').count()
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('jinian').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }

      let res = await Promise.all(tasks)

      res = res.reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })

      _this.setData({
        dates: _sortBy(res.data, (o) => o.date)
      })

    } catch (error) {
      console.log(error, 'error')
    } finally {
      wx.hideLoading();
    }
  },

  deleteDate(obj) {
    const _this = this;
    db.collection('jinian').doc(obj._id).remove({
      success: function(res) {
        console.log(res, 'delete res')
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1000,
        });
        _this.getDates();
      },
      fail: function(error) {
        console.log(error, 'delete error');
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1000,
        });
      }
    })
  },

})
