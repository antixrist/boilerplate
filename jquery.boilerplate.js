/*
 *  jQuery Boilerplate
 *  A jump-start for jQuery plugins development.
 *  https://github.com/antixrist/jquery.plugin.boilerplate
 
 *  Under WTFPL License
 */
;(function (window, document, $, undefined) {

  var pluginName = 'defaultPluginName';
  var defaults = {
    propertyName: 'value'
  };
  
  var helpers = {
    dashedize: function (string) {
      string = string.toString() || '';
      return string.replace(/([A-Z])/g, function ($1) {
        return "-"+$1.toLowerCase();
      });
    },
    camelize: function(){
      return this.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-','');
      });
    },
    underscorize: function(){
      return this.replace(/([A-Z])/g, function ($1) {
        return "_"+$1.toLowerCase();
      });
    },
    keypath: function (kp, object, fn) {
      var parts = kp.split('.');
      var len   = parts.length;
      var root  = object;

      try {
        for (var i = 0; i < len; i++) {
          var p = parts[i];

          // Handle arrays
          var keys = p.match(/^(.*?)(?:\[(.*)\])$/);
          if (keys) {
            var arrprop = keys[1];
            var arrkey  = keys[2].split('][');
            if (arrprop.length > 0) {
              root = root[arrprop];
            }

            do {
              root = root[arrkey.shift()];
            } while (arrkey.length);
          }
          else {
            root = root[p];
            if (typeof root === 'undefined' && fn) {
              throw new Error(kp + ' is undefined.');
            }
          }
        }
      }
      catch (err) {
        root = undefined;
        if (typeof fn === 'function') {
          fn(err);
        }
        // Re-throw err
        else if (typeof fn === 'boolean' && fn) {
          throw err;
        }
      }

      return root;
    },
    getAttributes: function ($node, startWith) {
      $node = $($node);
      startWith = startWith.toString().toLowerCase() || '';
      var result = {};

      $.each($node.get(0).attributes, function(index, attr) {
        var key = attr.nodeName;
        var value = attr.nodeValue;

        if (key.substr(0, startWith.length) != startWith) {
          return;
        }

        key = key.substr(startWith.length);
        result[key] = value;
      });

      return result;
    }
  };

  /**
   * Public methods list
   */
  var publicApi = {
    config: function (options) {
      if (typeof options != 'undefined') {
        return this.setOptions(options);
      }

      return this.getOptions();
    }
  };

  /**
   * @param {string} eventName
   * @returns {string}
   */
  var getEvent = function (eventName) {
    return [eventName.toString(), pluginName].join('.');
  };

  var Plugin = function (element, options) {
      this._name = pluginName;
      /** @type {jQuery|HTMLElement} */
      this.$el =  $(element);
      /** @type {HTMLElement} */
      this.el = this.$el.get(0);
      this._defaults = defaults;
      this.options = {};

      this.setOptions(defaults);
      this.setOptions(this.getAttributesConfig());
      this.setOptions(options || {});

      this.init();
  };

  $.extend(Plugin.prototype, {
      /**
       * @param {{}} options
       */
      setOptions: function setOptions_ (options) {
        options = $.isPlainObject(options) ? options : {};
        return this.options = $.extend(true, this.options, options);
      },
      /**
       * @returns {{}}
       */
      getAttributesConfig: function () {
        var options =  helpers.getAttributes(this.$el, 'data-'+ this._name +'-');
        options = this.parseAttributesOptions(options);
        return options;
      },
      /**
       * @param {{}} options
       * @returns {{}}
       */
      parseAttributesOptions: function (options) {
        return options;
      },
      /**
       * @returns {{}}
       */
      getOptions: function setOptions_ () {
        return this.options;
      },
      /**
       * @param node
       * @returns {jQuery|HTMLElement}
       * @private
       */
      $: function $_ (node) {
        return $(node, this.$el);
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
          instance = new StarRating(this);
        } else {
          instance = new (Function.prototype.bind.apply(StarRating, [null, this].concat(args)));
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
