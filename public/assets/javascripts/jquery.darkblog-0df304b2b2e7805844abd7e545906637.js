(function() {

  (function($) {
    var strip;
    strip = function(text) {
      return text.replace(/^\s+|\s+$/g, '');
    };
    return $.expr[':'].regex = $.expr.createPseudo(function(selector) {
      return function(elem) {
        var attr, regex, _ref;
        _ref = selector.split(','), attr = _ref[0], regex = _ref[1];
        regex = new RegExp(strip(regex), 'ig');
        return regex.test($(elem)['attr'](attr));
      };
    });
  })(jQuery);

}).call(this);
