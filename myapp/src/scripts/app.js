require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');

// require Views
require('./views/guide.js');
require('./views/index.js');
require('./views/news.js');
require('./views/my.js');
require('./views/sidebar.js');
require('./views/dialog.js');
require('./views/footer.js');

//定义视图模块
SPA.config({
  indexView:'guide'
});
