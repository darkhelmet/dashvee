(function() {

  $.getScriptLite = function(src) {
    var script;
    script = $('<script/>', {
      src: src,
      type: 'text/javascript',
      async: 'async',
      defer: 'defer'
    }).get(0);
    return $('head').get(0).appendChild(script);
  };

  $(function() {
    var fancyBoxEffects;
    CFInstall.check({
      mode: 'overlay'
    });
    Embedly.defaults.key = 'fd17fbebd90947588f7bbf26f04bceea';
    fancyBoxEffects = {
      openEffect: 'elastic',
      openEasing: 'easeOutBack',
      closeEffect: 'elastic',
      closeEasing: 'easeInBack'
    };
    $('.content a:regex(href, png|jpe?g|gif)').fancybox(fancyBoxEffects);
    $('.content a').embedly({
      re: /(youtube|vimeo)\.com/i,
      maxWidth: 640,
      wmode: 'opaque'
    });
    $('.content a.twitter').embedly({
      re: /twitter\.com/i,
      maxWidth: 640
    });
    $('.content a').embedly({
      re: /slideshare\.net/i,
      maxWidth: 640
    });
    $('.content a').embedly({
      re: /twitter\.com/i
    }, function(oembed, elem) {
      $(elem).attr('title', oembed.description);
      return $(elem).click(function() {
        var div;
        div = $('<div class="embedly" />');
        div.html($(oembed.code));
        $.fancybox(div, fancyBoxEffects);
        return false;
      });
    });
    $('p.footnote:first').addClass('first');
    if (document.getElementsByTagName('plusone').length > 0) {
      $('plusone').replaceWith('<g:plusone size="medium"></g:plusone>');
      $.getScriptLite('//apis.google.com/js/plusone.js');
    }
    if (document.getElementById('fb-root')) {
      $.getScriptLite('//connect.facebook.net/en_US/all.js#appId=286712658022064&xfbml=1');
    }
    if (document.getElementById('rdbWrapper')) {
      $.getScriptLite('//www.readability.com/embed.js');
    }
    if (document.getElementsByClassName('twitter-share-button').length > 0) {
      return $.getScriptLite('//platform.twitter.com/widgets.js');
    }
  });

}).call(this);
