/*
 *  jQuery Boilerplate
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
;(function (window, document, $, undefined) {

  var pluginName = 'defaultPluginName';
  var defaults = {
    propertyName: 'value'
  };

  var Plugin = function (element, options) {
    this.el = element;
    this.$el = $(element);
    this.options = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  $.extend(Plugin.prototype, {
    init: function () {

    },
    otherFunction: function () {

    }
  });

  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, 'plugin_'+ pluginName)) {
        $.data(this, 'plugin_'+ pluginName, new Plugin(this, options));
      }
    });

    return this;
  };

})(window, document, jQuery);
