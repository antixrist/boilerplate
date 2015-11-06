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
  
  /**
   * Public methods list
   */
  var publicApi = {
    'config': 'setOptions'
  };

  /**
   * @param {string} eventName
   * @returns {string}
   */
  var getEvent = function (eventName) {
    return [eventName.toString(), pluginName].join('.');
  };

  var Plugin = function (element, options) {
    this.$el =  $(element);
    this.el = this.$el.get(0);
    this.options = {};
    this.setOptions(options || {});
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  $.extend(Plugin.prototype, {
    setOptions: setOptions_ function (options) {
      options = $.isPlainObject(options) ? options : {};
      this.options = $.extend(true, this.options, this._defaults, options);
    },
    $: function $_ (selector) {
      return $(selector, this.$el);
    },
    init: function init_ () {
      this.setElements();
      this.bindEvents();
    },
    setElements: function setElements_ () {
      
    },
    bindEvents: function bindEvents_ () {
      
    },
  });

  $.fn[pluginName] = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    
    var api = null;
    if (args.length && typeof args[0] == 'string') {
      api = args.splice(0, 1)[0];
    }
    
    var config = null;
    if (args.length && $.isPlainObject(args[0])) {
      config = args[0];
    }
    
    this.each(function () {
      var instance = $.data(this, 'plugin_'+ pluginName);
      if (!instance) {
        if (api) {
          // without arguments (run with default options)
          instance = new Plugin(this);
        } else {
          instance = new (Plugin.bind.apply(Plugin, [this].concat(args)));
        }
        $.data(this, 'plugin_'+ pluginName, instance);
      }
      
      if (config) {
        instance.setOptions(config);
      } else if (api && (api in publicApi)) {
        
        var func;
        if ($.isFunction(publicApi[api])) {
          func = publicApi[api];
        } else if ($.isFunction(instance[publicApi[api]])) {
          func = instance[publicApi[api]];
        }
        
        func.apply(instance, args);
      }
    });

    return this;
  };


})(window, document, jQuery);
