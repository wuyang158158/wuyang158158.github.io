// 引入模板
var footerTpl = require('../tpl/footer.string');
var _ = SPA.util;

// 定义一个视图
SPA.defineView('footer', {
  // 将模板写在body里
  html: footerTpl,

  // 定义子视图
  modules: [{
    name: 'content',
    views: ['index', 'news', 'my'],
    container: '.m-index-container',
    defaultTag: 'index'
  }],

  init: {
    setActive: function (obj) {
      obj.find("i").addClass('active').parent().siblings().find("i").removeClass('active');
      obj.find("b").addClass('active').parent().siblings().find("b").removeClass('active');
    }
  },

  plugins: [
    'delegated'
  ],

  bindActions: {
    // 切换子视图
    'tap.switch': function (e, data) {
      // 切换：launch方法里传入视图的名字
      this.modules.content.launch(data.tag);
      this.setActive($(e.el));
    },

    // 我的试图切换
    'tap.my': function (e, data) {
      this.setActive($(e.el));
      this.modules.content.launch('my');

      // localstorage 操作
      if(!_.storage('isLogin')) {
        // 打开dialog视图
        SPA.open('dialog', {
          ani: {
            name: 'dialog',
            width: 280,
            height: 200,
            autoHide: true
          }
        });
      }
    },

    'tap.exit': function () {
      // 关闭视图
      this.hide();
    }
  }
});
