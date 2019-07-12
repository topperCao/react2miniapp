
Page({
  data: {
    inputText: '',
    average: '',
    result1: '',
    result11: '',
    result2: '',
    result22: '',
  },
  onInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  onClear() {
    this.setData({
      inputText: '',
      average: '',
      result1: '',
      result11: '',
      result2: '',
      result22: '',
    })
  },
  onSubmit() {
    let { inputText } = this.data;
    const args = inputText.trim().replace(/\s{1,}/ig, ' ').split(' ').map(item => Number(item));
    const len = args.length;
    if(len < 2) {
      wx.showToast({
        title: '请至少输入2个数字',
        icon: 'none',
        duration: 1000,
      })
      return;
    }

    const total = args.reduce((pre, cur) => cur + pre);
    const average = total/len;
    const result1 = Math.sqrt((args.reduce((pre, cur) => {
      return Math.pow((cur-average), 2) + pre;
    }, 0))/(len-1));
    const result11 = result1/average;

    const result2 = (args.reduce((pre, cur) => {
      return Math.abs(cur-average) + pre;
    }, 0))/len;
    const result22 = result2/average;

    this.setData({
      average: average.toFixed(5),
      result1: result1.toFixed(5),
      result11: (result11*100).toFixed(5) + '%',
      result2: result2.toFixed(5),
      result22: (result22*100).toFixed(5) + '%',
    });
  },
});
