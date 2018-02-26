// pages/L/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    L: '',
    arrlist: [9,4,6,2,14,0],
    offset: 0,
    limit: 5,
    open: false,
    collectList: [],
    showCollect: false,
    tempId: ''
  },
  tap_ch: function () {
    this.setData({
      open: !this.data.open
    })
  },
  qM3: function (arr) { // 快速排序 由大到小 评分
    return arr.sort((a, b) => {return a['sc'] - b['sc']}).reverse()
  },
  getList (offset='0', limit='5') {  // limit 每次请求数  offset 请求数据开始位置
    wx.showLoading({
      title: '列表加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 200)
    if (this.data.L.length === 57) {
      wx.showToast({
        title: '已经到底了',
      })
      wx.stopPullDownRefresh()
      setTimeout(function () {
        wx.hideToast()
      },200)
      return
    }
    wx.request({
      url: 'https://m.maoyan.com/movie/list.json?' + 'type=' + 'hot+' + '&offset=' + offset + '&limit=' +limit,
      success: (res) => {
        let list = res.data.data.movies.map((item, index)=>{
          return {
            isShow: false,
            ...item
          }
        })
        this.setData({ maoList: this.qM3(list)})
      }
    })
  },
  getDatail (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  getCollect (e) {
    let index = e.currentTarget.dataset.index   // 点击数组下标
    let tempItem = e.currentTarget.dataset.item // 点击当前对象
    this.data.maoList[index].isShow = !this.data.maoList[index].isShow // 切换收藏图标状态
    this.setData({
      maoList: this.data.maoList
    }) // 更新列表状态
    let isSame = this.data.collectList.some(item => {
      return item.id === tempItem.id
    })
    if (!isSame) {
      this.data.collectList = this.data.collectList.concat(tempItem)
    } else {
      this.data.collectList = this.data.collectList.filter(item => item.id !== tempItem.id)
    }
    this.setData({
      collectList: this.data.collectList
    }) // 更新列表状态
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    wx.getStorage({
      key: 'item',
      success: (res) => {
        console.log(res, '收藏数据')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉动作')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉触底')
    this.setData({ limit: this.data.limit+5})
    this.getList(0, this.data.limit)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('右上角分享')
  }
})