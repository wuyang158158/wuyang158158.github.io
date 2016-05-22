//引入模板
var indexTpl = require('../tpl/index.string');
var maskTpl = require('../tpl/mask.string');
//定义一个视图
SPA.defineView('index',{
  //将模板写在body里
  html:indexTpl,

  plugins:[
    'delegated',
    {
      name:'avalon',
      options:function(vm){
        vm.indexList = [];

        //定义一个homelist临时公共数组
        vm.indexTempList = [];

        // 保存是否加载完数据，显示loading...
        vm.isShowLoading = true;
      }
    }
  ],

 // 给视图定义公共的属性和方法
  init:{
    //定义视图公共的home hot swiper对象
    myHomeHotSwiper: null,
    myPicSwiper:null,
    // 定义scroll对象
    myScroll: null
  },
  bindActions: {
        'tap.hot.slide': function (e) {
          // 获得视图公共的home hot swiper, 跳转到某个slider
          this.myHomeHotSwiper.slideTo($(e.el).index());
          //被clon的切换到谁就显示谁得高亮
          $(e.el).find("span").addClass('active').parent().siblings().find("span").removeClass('active');
        },

        // 显示sidebar
       'show.sidebar': function (e, data) {
         var that = this;
         var el = document.body;
         SPA.show('sidebar', {
           ani: {
             name: 'popup',
             width: '100%',
             height: $(el).height(),
             direction: 'left'
           }
         }, el);

         // 存储临时的sidebar view
         var sidebarView = null;

         // 将mask 放到body里
         $(maskTpl).appendTo(el);

         // 获得sidebar视图
         SPA.getView('sidebar', function (view) {
           view.hide();
           $('#m-mask').remove();
         });

       }
     },
  bindEvents:{
    beforeShow:function(){
      // 保存视图对象
      var that = this;

      //获得avalon的vm
      var vm = that.getVM();

      var gapSize = 26;

      //第一次渲染数据
      $.ajax({
        //url:'/api/indexList.php',
        url:'/myapp/mock/index.json',
        success:function(res){
          //第一个获得的数据临时存储在indexTempList里面
          vm.indexTempList = res.data;

          setTimeout(function(){
            vm.indexList = vm.indexTempList;
            vm.isShowLoading = false;
            that.myScroll.scrollBy(0, -gapSize);
          },500);
        }
      });

      // 定义home hot swiper
      setTimeout(function(){
      that.myHomeHotSwiper = new Swiper('#home-hot-swiper', {
        //autoHeight: true,  //bug
        noSwiping:true,
        loop: false,
        onSlideChangeStart: function () {
        $('#home-hot-nav li span').eq(that.myHomeHotSwiper.activeIndex).addClass('active').parent().siblings().find("span").removeClass('active');
        }
      });
    },550);
    setTimeout(function(){
    that.myPicSwiper = new Swiper('#pic-swiper',{
      autoplay:5000,
      autoplayDisableOnInteraction : false,
      pagination: '.swiper-pagination',
      paginationClickable :true,
      loop:true
    });
  },620);


      // 下拉刷新，上拉加载
     // 使scroll pullToRefresh 滞后执行
     setTimeout(function () {
       // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
       that.myScroll = that.widgets.homeHotScroll;
       var gapSize = 26;
       var pageNo = 0;
       //上啦刷新一次渲染几条数据
       var pageSize = 2;
       that.myScroll.scrollBy(0, -gapSize);

       var head = $('.head img'),
           topImgHasClass = head.hasClass('up');
       var foot = $('.foot img'),
           bottomImgHasClass = head.hasClass('down');
       that.myScroll.on('scroll', function () {
           var y = this.y,
               maxY = this.maxScrollY - y;
           if (y >= 0) {
               !topImgHasClass && head.addClass('up');
               return '';
           }
           if (maxY >= 0) {
               !bottomImgHasClass && foot.addClass('down');
               return '';
           }
       });

       that.myScroll.on('scrollEnd', function () {
           if (this.y >= -100 && this.y < 0) {
               that.myScroll.scrollTo(0, -gapSize);
               head.removeClass('up');
           } else if (this.y >= 0) {
               head.attr('src', '/myapp/images/ajax-loader.gif');
               //TODO ajax下拉刷新数据
               $.ajax({
                 //url:'/api/indexListNew.php',
                 url:'/myapp/mock/indexHomeList.json',
                 data:{
                   type:'refresh'
                 },
                 success:function(res){
                   vm.indexTempList.$model = res.data.concat(vm.indexTempList.$model);
                   vm.indexList = vm.indexTempList.$model;

                   that.myScroll.scrollTo(0, -gapSize);
                   head.removeClass('up');
                   head.attr('src', '/myapp/images/arrow.png');
                 }
               });
           }

           var maxY = this.maxScrollY - this.y;
           var self = this;
           if (maxY > -gapSize && maxY < 0) {
               that.myScroll.scrollTo(0, self.maxScrollY + gapSize);
               foot.removeClass('down')
           } else if (maxY >= 0) {
               foot.attr('src', '/myapp/images/ajax-loader.gif');
               //TODO ajax上拉加载数据
                $.ajax({
                  //url:'/api/indexListNew.php',
                  url:'/myapp/mock/indexList.json',
                  data:{
                    page:pageNo,
                    pageSize:pageSize
                  },
                  success:function(res){
                    vm.indexTempList.pushArray(res.data);
                    vm.indexList = vm.indexTempList.$model;
                    pageNo++;

                    that.myScroll.refresh();
                    that.myScroll.scrollTo(0, self.y + gapSize);
                    foot.removeClass('down');
                    foot.attr('src', '/myapp/images/arrow.png');
                  }
                })
           }
       });
       //停靠菜单
       setTimeout(function () {
       var fixedMenu = $('.fixedMenu');
       var offsetTop = fixedMenu.offset().top;
       var myFS = that.widgets.homeHotScroll;
       myFS.on('scroll',function(){
         //console.log(offsetTop)
         if(Math.abs(this.y) >= offsetTop-18 ){
           if($('#m-index-container > spa-view > #fixedMenu').length <= 0){
             fixedMenu.clone(true).appendTo($('#m-index-container > spa-view'));
             //avalon.scan(that.root, vm);
           }
         }else{
            $('#m-index-container > spa-view > #fixedMenu').remove();
         }
       })
     },525);
     }, 0);
    }
  }
})
