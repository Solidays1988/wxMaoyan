// pages/cutString.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    outStr: {
      type: String,
      value: '简介详情',
      observer: function(newVal, oldVal){
        this.getDia(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inStr: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDia: function (str) {
      return this.setData({
        inStr: str.slice(3, str.length-20) + '...'
      })
    }
  }
})
