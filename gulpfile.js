// 引入gulp
var gulp = require('gulp');

// 引入webserver
var webserver = require('gulp-webserver');

// 引入两个原生的模块
var fs = require('fs');
var url = require('url');

// 引入版本号控制的两个文件
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// 引入编译sass的模块
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// 引入js 模块化开发的相关模块
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var uglify = require('gulp-uglify');

// index.html copy到gulphome下
gulp.task('copy-index', function () {
  gulp.src('./index.html')
    .pipe(gulp.dest('./gulphome/'));
});

// 启动server
gulp.task('webserver', function () {
  gulp.src('./')
   .pipe(webserver({

     // 自动刷新浏览器
     livereload: true,

     // 列示目录和文件
     directoryListing: {
       enable: true,
       path: './'
     },

     // 定义域名
     host: 'localhost',

     // 定义端口号
     port: 80,

     // mock 数据
     middleware: function (req, res, next) {
       var urlObj = url.parse(req.url, true);
       var method = req.method;
       switch (urlObj.pathname) {
         case '/api/homeList.php':
          res.setHeader('Content-Type', 'application/json');
          fs.readFile('./mock/home.json', 'utf-8', function (err, data) {
            res.end(data);
          });
          return;
        case '/api/xx.php':
          //.....
          return;
        case '/api/yyy.php':
          //....
          return;
       }
       next();
     }
   }));
});

// 编译sass, 合并压缩
var cssFiles = [
  './src/styles/app.scss'
];
gulp.task('scss', function () {
  return gulp.src(cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./gulphome/prd/styles/'));
});
gulp.task('css', function () {
  return gulp.src('./gulphome/styles/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./gulphome/prd/styles/'));
});

// js 模块化开发
var jsFiles = [
  './src/scripts/app.js'
];
gulp.task('packjs', function () {
  return gulp.src(jsFiles)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'imports?define=>false'
        }]
      },
      resolve: {
        alias: {
          '/aaa/bbb/jquery.js': 'jQuery'
        }
      },
      devtool: '#eval-source-map'
    }))
    .pipe(uglify().on('error', function (e) {
      console.log('\x07', e.lineNumber, e.message);
      return this.end();
    }))
    .pipe(gulp.dest('./gulphome/prd/scripts/'));
});

// 版本号控制
var cssDistFiles = [
  './gulphome/prd/styles/app.css'
];
var jsDistFiles = [
  './gulphome/prd/scripts/app.js'
];
gulp.task('ver', function () {
  gulp.src(cssDistFiles)
    .pipe(rev())
    .pipe(gulp.dest('./gulphome/prd/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./gulphome/ver/styles'));

  gulp.src(jsDistFiles)
    .pipe(rev())
    .pipe(gulp.dest('./gulphome/prd/scripts'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./gulphome/ver/scripts'));
});
gulp.task('html', function () {
  gulp.src(['./gulphome/ver/**/*.json', './gulphome/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./gulphome/'));
})
gulp.task('min', ['ver', 'html']);

// 创建一个watch任务
gulp.task('watch', function () {
  gulp.watch('./index.html', ['copy-index']);
  gulp.watch('./src/styles/**/*', ['scss', 'css']);
  gulp.watch('./src/scripts/**/*', ['packjs']);
});

// default任务
gulp.task('default', ['watch', 'webserver']);
