// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mM: '',
    hcmts: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '9999')
    console.log(wx.getStorage({
      key: 'item',
      success: (res) => {
        console.log(res, 'res---')
      }
    }))
    let id = options.id
    wx.request({
      url: 'https://m.maoyan.com/movie/' + id + '.json',
      success: (res) => {
        this.setData({
          mM: res.data.data.MovieDetailModel,
          hcmts: res.data.data.CommentResponseModel.hcmts
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})