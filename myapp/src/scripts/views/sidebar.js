var sidebarTpl = require('../tpl/sidebar.string');

var _ = SPA.util;

SPA.defineView('sidebar', {
  html: sidebarTpl,

  styles: {
    background: 'white !important'
  },

  plugins: ['delegated'],

  bindActions: {
    'close': function () {
      this.hide();
    }
  },

  bindEvents: {
    show: function () {
      var zIndex = parseInt(this.root.style.zIndex, 10);
      $('#m-mask').css('z-index', zIndex - 1);
    }
  }
})
