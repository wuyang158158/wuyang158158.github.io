var guideTpl = require('../tpl/guide.string');

SPA.defineView('guide',{
  html:guideTpl,

  //插件列表
  plugins:[
    'delegated'
  ],

  //给模块绑定事件
  bindActions:{
    'goto.index':function () {
      //进入视图

      SPA.open('footer');
    }
  },

  //给视图绑定事件
  bindEvents:{
    //在视图还没有打开的时候触发
    beforeShow:function () {
      //swiper
      var mySwiper = new Swiper('#guide-swiper',{
        loop:false
      });
    }
  }
})
