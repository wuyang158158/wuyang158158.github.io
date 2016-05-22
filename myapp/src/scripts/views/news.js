//引入模板
var newsTpl = require('../tpl/news.string');

//定义一个视图
SPA.defineView('news',{
  //将模板写在body里面
  html:newsTpl,

  plugins:[
    'delegated'
  ],

  bindActions:{

  }
})
