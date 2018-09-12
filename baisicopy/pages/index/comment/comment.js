// pages/index/comment/comment.js
var util=require('../../../utils/util.js');
var curPage = 1;
var data_id = 0;//帖子的ID

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    hotItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    data_id=options.id;
    this.requestData();

  },
  requestData:function(){
    var params = {
      'a':'dataList','c':'comment','data_id':data_id,'hot':1,'page':curPage};
    var that = this;
    util.request(params, function (res) {
      console.log(res);
        if(curPage==1){
          that.setData({
            dataList:res.data,
            hotItem:res.hot
          });
        }else{
          var data1 = that.data.dataList;
          that.setData({
            dataList: data1.concat(res.data)
          });
        }
      });
   
  }
  ,

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
      curPage = curPage + 1;
    this.requestData();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  scrollToUp:function(){
    console.log('上');

    curPage = 1;
    this.requestData();
  },
  scrollToBottom:function(){
    console.log('下');
    curPage=curPage+1;
    this.requestData();
  }
})