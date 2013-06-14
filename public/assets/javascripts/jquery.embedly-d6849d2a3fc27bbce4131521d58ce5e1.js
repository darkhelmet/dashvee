(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  this.Embedly = (function() {

    Embedly.templates = {
      photo: Handlebars.compile("<a href='{{url}}' target='_blank'><img style='{{imageStyle}}' src='{{oembed.url}}' alt='{{title}}' /></a>"),
      wrap: Handlebars.compile("<{{element}} class='{{class}}'>{{{code}}}</{{element}}>"),
      thumb: Handlebars.compile("<img src='{{src}}' class='thumb' style='{{style}}'/>"),
      description: Handlebars.compile("<div class='description'>{{description}}</div>"),
      provider: Handlebars.compile("<a href='{{url}}' class='provider'>{{name}}</a>"),
      link: Handlebars.compile("<a href='{{url}}'>{{title}}</a>")
    };

    Embedly.defaults = {
      scheme: 'http:',
      frame: false,
      wmode: 'opaque',
      method: 'replace',
      addImageStyles: true,
      wrapElement: 'div',
      className: 'embed'
    };

    function Embedly(options, elements, callback) {
      var element, request, url, urls, _i, _len, _ref;
      this.options = options;
      this.elements = elements;
      this.callback = callback;
      this.processEmbeds = __bind(this.processEmbeds, this);

      this.embed = __bind(this.embed, this);

      if ((_ref = this.callback) == null) {
        this.callback = this.embed;
      }
      this.dict = {};
      urls = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        urls.push(element.href);
        this.dict[element.href] = element;
      }
      url = "" + this.options.scheme + "//api.embed.ly/1/oembed";
      request = $.ajax({
        url: url,
        dataType: 'jsonp',
        data: this.buildParams(urls)
      });
      request.done(this.processEmbeds);
    }

    Embedly.prototype.buildParams = function(urls) {
      var k, params, v, _ref, _ref1, _ref2, _ref3, _ref4;
      params = {
        key: this.options.key,
        urls: urls.map(escape).join(',')
      };
      if ((_ref = params.maxWidth) == null) {
        params.maxWidth = this.options.maxWidth;
      }
      if ((_ref1 = params.maxHeight) == null) {
        params.maxHeight = this.options.maxHeight;
      }
      if ((_ref2 = params.chars) == null) {
        params.chars = this.options.chars;
      }
      if ((_ref3 = params.words) == null) {
        params.words = this.options.words;
      }
      if ((_ref4 = params.frame) == null) {
        params.frame = this.options.frame;
      }
      params.wmode = this.options.wmode;
      return ((function() {
        var _results;
        _results = [];
        for (k in params) {
          if (!__hasProp.call(params, k)) continue;
          v = params[k];
          if (v != null) {
            _results.push("" + k + "=" + v);
          }
        }
        return _results;
      })()).join('&');
    };

    Embedly.prototype.embed = function(oembed, elem) {
      switch (this.options.method) {
        case 'replace':
          return $(elem).replaceWith(oembed.code);
        case 'after':
          return $(elem).after(oembed.code);
        case 'afterParent':
          return $(elem).parent().after(oembed.code);
        case 'replaceParent':
          return $(elem).parent().replaceWith(oembed.code);
      }
    };

    Embedly.prototype.createImageStyle = function() {
      var style;
      style = [];
      if (this.options.addImageStyles) {
        if (this.options.maxWidth != null) {
          style.push("max-width: " + this.options.maxWidth + "px");
        }
        if (this.options.maxHeight != null) {
          style.push("max-height: " + this.options.maxHeight + "px");
        }
      }
      return style.join(';');
    };

    Embedly.prototype.processEmbeds = function(oembeds) {
      var index, oembed, _i, _len, _results;
      _results = [];
      for (index = _i = 0, _len = oembeds.length; _i < _len; index = ++_i) {
        oembed = oembeds[index];
        _results.push(this.processEmbed(oembed, this.elements[index]));
      }
      return _results;
    };

    Embedly.prototype.processEmbed = function(oembed, elem) {
      var code, description, link, provider, thumb, title;
      code = (function() {
        switch (oembed.type) {
          case 'photo':
            title = oembed.title || '';
            return Embedly.templates.photo({
              url: elem.href,
              imageStyle: this.createImageStyle(),
              title: title,
              oembed: oembed
            });
          case 'video':
          case 'rich':
            return oembed.html;
          default:
            title = oembed.title || elem.href;
            thumb = oembed.thumbnail_url != null ? Embedly.templates.thumb({
              src: oembed.thumbnail_url,
              style: this.createImageStyle()
            }) : '';
            description = oembed.description != null ? Embedly.templates.description({
              description: oembed.description
            }) : '';
            provider = oembed.provider_name != null ? Embedly.templates.provider({
              url: oembed.provider_url,
              name: oembed.provider_name
            }) : void 0;
            link = Embedly.templates.link({
              url: elem.href,
              title: title
            });
            return [thumb, link, provider, description].join();
        }
      }).call(this);
      if (this.options.wrapElement === 'div' && $.browser.msie && $.browser.version < 9) {
        this.options.wrapElement = 'span';
      }
      if (this.options.wrapElement) {
        code = Embedly.templates.wrap({
          element: this.options.wrapElement,
          "class": this.options.className,
          code: code
        });
      }
      oembed.code = code;
      $(elem).data('oembed', oembed).trigger('embedly:oembed', oembed);
      return this.callback(oembed, elem);
    };

    return Embedly;

  })();

  (function($) {
    return $.fn.embedly = function(options, callback) {
      var elements;
      elements = $(this).filter(function() {
        return options.re.test(this.href);
      });
      if (elements.length === 0) {
        return;
      }
      options = $.extend({}, Embedly.defaults, options);
      return new Embedly(options, elements, callback);
    };
  })(jQuery);

}).call(this);
