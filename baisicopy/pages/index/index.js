//index.js
const util = require("../../utils/util.js");
//获取应用实例
const app = getApp()
var playingID = -1;
var types = ["1", "41", "10", "29", "31"];
var curPages=[1,1,1,1,1];//当前滑动页数
var curPagePostions=[];//当前滑动位置
var curIsPage=[0,0,0,0,0];//当前页面是否有数据
var currentPostions = [0,0,0,0,0];//当前滚动位置
var curPagePCs = [0, 0, 0, 0, 0];;//当前滚动位置替换

var curSwiper=0;
var dataType = 0;
var page = 1;//页码
var allMaxtime = 0;//全部 最大时间
var videoMaxtime = 0;//视频 最大时间
var pictureMaxtime = 0;//图片 最大时间
var textMaxtime = 0;//段子 最大时间
var voiceMaxtime = 0;//声音 最大时间

var curVP=0;//当前视频位置
var curVH=0;//当前视频高度
var windowHeight = 750;


var DATATYPE = {
  ALLDATATYPE: "1",
  VIDEODATATYPE: "41",
  PICTUREDATATYPE: "10",
  TEXTDATATYPE: "29",
  VOICEDATATYPE: "31"
};

var curPage=1;

Page({
  data: {
    videoDetail:{},
    videoCurrentId:0,//正在播放的视频
    currentItemId:0,//当前位置swiper
    swiperItemLeft:'0',//navline位置
    navItemTitles:['全部','视频','图片','段子','声音'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dataList:[],//全部
    dataVideo:[],//视频
    dataPic:[],//图片
    dataTalk:[],//段子
    dataVoice:[],//声音
    scrollTop:0
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    var that = this;
  wx.getSystemInfo({
    success: function(res) {
        windowHeight=res.windowHeight/res.windowWidth*750

    },
  })
    this.getData();
  },
  onPullDownRefresh:function(){
   
  },
  onReachBottom:function(){
  
  },
  // 滑动到顶部
  scrollToUp:function(){
    curPage =  1;
    curPages[curSwiper]  =curPage;

    this.getData('全部');
  },
  // 触摸滑动事件scrollview不管用
  handletouchmove:function(e){
 
  },
  //滑动到底部
  loadMoreData:function(){
   curPage = curPage + 1;
    curPages[curSwiper] = curPage;

    this.getData();

  } ,
  //获取数据
  getData: function () {
    var that = this;
    var parameters = {'a':'list','c':'data','type' :types[curSwiper],'page':curPage};
    util.request(parameters, function (res) {
      curIsPage[curSwiper]=1;
     
      switch(curSwiper){
        case 0:
        if (curPage == 1) {
            that.setData({
              dataList: res.list
            });
          } else {
            var data = that.data.dataList;
            that.setData({
              dataList: data.concat(res.list)
            });
          }
        break;
        case 1:
          if (curPage == 1) {
            that.setData({
              dataVideo: res.list
            });
          } else {
            var data = that.data.dataVideo;
            that.setData({
              dataVideo: data.concat(res.list)
            });
          }
          break;
        case 2:
          if (curPage == 1) {
            that.setData({
              dataPic: res.list
            });
          } else {
            var data = that.data.dataPic;
            that.setData({
              dataPic: data.concat(res.list)
            });
          }
          break;
        case 3:
          if (curPage == 1) {
            that.setData({
              dataTalk: res.list
            });
          } else {
            var data = that.data.dataTalk;
         
            that.setData({
              dataTalk: data.concat(res.list)
            });
          }
          break;
        case 4:
          if (curPage == 1) {
            that.setData({
              dataVoice: res.list
            });
          } else {
            var data = that.data.dataVoice;
            that.setData({
              dataVoice: data.concat(res.list)
            });
          }
          break;
      }

      
     
      
      // page = 1;
      // that.setNewDataWithRes(res, that);
      setTimeout(function () {
        // util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  }
  ,
  //获取用户数据
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //点击图片
  imageClick:function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.imageurl],
    })
  },
  //点击播放视频
  palyClick:function(e){
    console.log(this.videoContext);
    if(this.videoContext){
      this.videoContext.pause();
      // this.videoContext=null;
      // return;

    }
   
    curVP = e.currentTarget.offsetTop + currentPostions[curSwiper];
    this.setData({
      videoCurrentId: e.currentTarget.dataset.imageid.id,
      videoDetail: e.currentTarget.dataset.imageid
    });

    this.videoContext = wx.createVideoContext('video111');
    

    // this.videoContext.play();
  },
  // 关闭视频
  closeVideo:function(){
    if (this.videoContext) {
      this.videoContext.pause();
    }
    this.setData({
      videoDetail: {}
    });
  }
,
  videoEnd:function(){
    this.closeVideo();
  }
,
  // //视频播放
  // videoPlay:function(e){
  //   this.setData({
  //     videoCurrentId: e.currentTarget.id
  //   });
  //   curVH=e.currentTarget.dataset.videoh;
  //   console.log(curVP);
  //   console.log(curVH);
  //   if (this.videoContext){
  //     if (this.videoContext.domId != e.currentTarget.id){
  //     this.videoContext.stop();
  //   }
  //   }
  //   this.videoContext=wx.createVideoContext(e.currentTarget.id, this);

  // },
  //回到顶部
  scrollToTop:function(e){
    if (currentPostions[curSwiper] > 0) {
      curPagePCs[curSwiper] = currentPostions[curSwiper];
      currentPostions[curSwiper] = 0;
      this.setData({
        scrollTop: 0,
      })
    } else {
      currentPostions[curSwiper] = curPagePCs[curSwiper];
      this.setData({
        scrollTop: curPagePCs[curSwiper],
      })
    }
  },
  //滚动事件
  scroll:function(e){
   
    currentPostions[curSwiper] = e.detail.scrollTop;
    // if (this.videoContext){
    //   if (e.detail.scrollTop > curVP + parseInt(curVH)){
    //     this.videoContext.pause();
    //     this.setData({
    //       videoCurrentId: 0
    //     });
    //   }
    

    //   if (e.detail.scrollTop + windowHeight < curVP){
    //     this.videoContext.pause();
    //     this.setData({
    //       videoCurrentId: 0
    //     });

    //   }


    // }
  },
  //swiper滚动事件
  swiperChange:function(e){
    this.setData({
      swiperItemLeft: e.detail.current
    });
    if(this.videoContext){
      this.closeVideo();

    }
   curSwiper = e.detail.current;
    curPage = curPages[curSwiper];
    if (curPage == 1 && curIsPage[curSwiper] ==0){
    this.getData();
    }
  },
  navItemClick:function(e){
    if (this.data.currentItemId == e.currentTarget.dataset.idx){
return;
    }else{
      this.setData({
        swiperItemLeft: e.currentTarget.dataset.idx,
        currentItemId: e.currentTarget.dataset.idx
      });
    }
   
    if (this.videoContext) {
     this.closeVideo();
    }
    curSwiper = e.currentTarget.dataset.idx;
    curPage = curPages[curSwiper];
    if (curPage == 1 && curIsPage[curSwiper] == 0) {
      this.getData();
    }
  }
  
})
