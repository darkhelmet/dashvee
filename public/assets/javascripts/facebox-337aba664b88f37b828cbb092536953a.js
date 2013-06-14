/*
 * Facebox (for jQuery)
 * version: 1.2 (05/05/2008)
 * @requires jQuery v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 * Usage:
 *
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox()
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 *
 *    jQuery.facebox('some html')
 *
 *  The above will open a facebox with "some html" as the content.
 *
 *    jQuery.facebox(function($) {
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page or image:
 *
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ image: 'dude.jpg' })
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */

(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading();

    if (data.ajax) {
      fillFaceboxFromAjax(data.ajax);
    } else if (data.image) {
      fillFaceboxFromImage(data.image);
    } else if (data.div) {
      fillFaceboxFromHref(data.div);
    } else if ($.isFunction(data)) {
      data.call($);
    } else {
      $.facebox.reveal(data, klass)
    }
  };

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0,
      overlay      : true,
      loadingImage : 'data:image/gif;base64,R0lGODlhIAAgAPcAAP%2F%2F%2F7Ozs%2Fv7%2B9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl%2F39%2FVRUVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCgAAACwAAAAAIAAgAAAI%2BgABCBxIkOCCAwsKKlzIcOCBhwUJFGiocICBgg8PEBzAkSLBAg8DEMw4sADHAR5HPkQpkKTAkwRSDjTwkIFDiAAInJRJkMHDiwBcwuQ5cMABnxMfOsi5c6DOATFfMmCQcGCAnwp1ljwJdeCCqVNZGq3akGvHnmCnRvVodu3GtDZTPnW78CsDlnJ5EgBKtC9RsxxNLjBAuHBfwBwLK%2BYr8%2BQCmAMGL%2FZLWSZdipcZzvW4OaXZiQpNcuUJuGBpzHifclyruuvLy6oJdmbq%2BuVqAE1PgiYqWuzZ2Idv4z47vLbcpsWdIvcsPHlR4szxOneamWEBussrZzVOMSAAIfkEBQoAAAAsAAAAABgAEgAACIAAAQgcSLAggAEGEypkAIAhQQMLFEZUOJDBgQMJGWgs6FDggosYDWrsmBCkgYQLNhLsaAAkxYYMJhIkAFJmxoYEBFps6FIgAQMGEFZUWbBlToEDgAI9SoCB0JdIlUIsADXhT6lVFSY9mVVhgaddw3odQLYs2KpmzYolUHZBWbEBAQAh%2BQQFCgAAACwBAAAAHQAOAAAIiQABCBxIcOAABgUTKlwoEGHCAQwHEoBIkIFFggEiEjRggGJDAA4BUAzJkKMBAgMthiSpcYDJlApZMlzAceTFAiBFFsSpkIBJnAgRGvg40MCBA0MHDEA5kGYAj00JLjh69KRSpTwLDI14kOpRg1cJMNXo9QBUkVfPLjR6IGNPpWM1MoibUKxGjQEBACH5BAUKAAAALAcAAAAZABEAAAiBAAEIHAiAgAGCCBMqBLDAwAKEDxcWIIDQgEWCDDIuHDCg4sWBGjdyLDDQ4kGQDCImJMCxo0CTAheEXAigJUUAMAkwALCTpkCbOD%2FOROjyJ8ebBAf0rLk04QCkCpHuDOCTZs%2BmVSHGzOrTAEmuYMMmPEC27AGVYM2aFQuArAOzCwICACH5BAUKAAAALA4AAAASABgAAAiCAAEsIACgoMGDCAcsQAhgAEGGAhcsNLjAgAGIEScCIGDxIkSJGjsOwAiy4ICOGDMCKNDx4UeJDQMY0CiQAYOUBgoctMmAJkabAICmDBr05tCdRo8edKm0adOkKW9KdXrAIIORTpsaYHrUwIEDAah%2B%2FeoT4gAGYw9AxZnWo9IAZAEEBAAh%2BQQFCgAAACwOAAAAEgAeAAAImQABDCgAoKDBgwgFDkjIsOCAhwcHLFjQ8OFCgxMvJrRoUCLFihALTvzIkCOAkQ0dhswY0YABAgwJaCTg0qXGhgtqGiDZUOfLlB1tAkU4cKhRowySKhUIlAEAp1Cdplya9KjVgwStfjRw1SCDmw0JBDg4lqGBAzAFVm3I4IDbgwacggVAwO0BnkDPvrVql%2BvRAXav2s161CXDgAAh%2BQQFCgAAACwPAAEAEQAfAAAIjAABCBwIgEABgggTDhiQsGGBhQ0jLiQQkSCBhQwrCrwIUePGjgM5ehSIcQDFihwxaiyZUSPHkyMJwBxJE6GBmzgXaMTJ00DFngZ01hxKcwADBkI9Hj1ac%2BnShjpbCjyaVKBPpgN1MhB4oCuAgyQjdj1AEGvCsQO3VkRLk%2B1UtWcPOFDY0K3HBQeqagwIACH5BAUKAAAALAgADgAYABIAAAh9AAEIHEiwIIABCBMOKGCw4UCFCh06TLggIQGJGDNiHKAxowEDHDsa%2FEjyosiBBRaQNLBA5AAGJgmsDHnwgIGGDAwO%2BGgSAIMDB3ISJMCgKMYFQA%2BYFApgAVOHSW86LNpyZFKCT30aNZi0KsasAq9iPVDQa1mpA3OCPUmzY0AAIfkEBQoAAAAsAgASAB0ADgAACIkAAQgcSLCgQQAEDhIkwEChQQIDBiQ8aODAAQMOCUbcWECjxY8ZNW6MKJDBxwMMBmQkgHHgSJYnWyZcYHCAAQM0B0JUWfFAAII%2FAWBkQBRAgZsGJj4sqBJAQ6dQAdi8GXLgU4JFBS642bRqVKhXWVINWbQr0asAtrasihatS6UOu2IN6pXt2owBAQAh%2BQQFCgAAACwAAA8AGQARAAAIgAAXHBhI8ACAgwgTKjxYsODChwkFEnQwEKLFixgxFjCQseOCjg8ZgIQYIGEAAhgHQGTAQOXBlgsJDJiZ0CVHhCxFAjDAE4DMmQUSBlXIEiHPmz9dWmT5cWfPgzMHoHy4oKjRp1BpLk14tKbWhVav3kQ4FWJThAsMnB2p0EDZhAEBACH5BAUKAAAALAEACAARABgAAAh3AAccOGAAgMGDCA8aGDhwQcKHABgOZDAAIsIFEg9YTBhgYMGNHEGKHEmypMmTKDcuYMCgJEuWIF%2B%2BBLmyJcICHx%2BydHhwgQEDFQcINUggIYGfBgoAEFoRItKmTCEOQHow6kOkRQ1aTfizqdahDwl4%2FToWpFgAAQEAIfkEBQoAAAAsAAACAA4AHQAACIoAAQgcCGCBAYIIBx44wCAhwoUHBjgcGADiRIULD15cYJFgQ4IQP3qUCIDAgQAEUYokMHHAR5ETFwiUeRFAAY01WzLYyROmwJ49E7rcCYBnzqMISV4cYMCAUoQEmkp1aFDqggJCrQ4kMACrwKhOCQ4Yy1Kg14EFxg4o61At24Rcx9ZUm1NuzgJvAwIAOw%3D%3D',
      closeImage   : 'data:image/gif;base64,R0lGODlhQgAWAOYAAMDAwMHBwZ2dnVlZWdLS0oODg6%2Bvr%2FX19eTk5FBQULi4uIyMjJSUlFRUVFZWVtzc3FJSUsnJyVFRUVhYWFVVVezs7FNTU%2Fb29v39%2Ferq6vr6%2BqampldXV6KiokxMTE9PT2ZmZvf3993d3czMzGBgYHt7e6Ghofz8%2FPDw8N7e3mxsbLW1tfv7%2B5WVlc3NzcrKynh4eOvr60tLS%2BDg4F9fX7m5ud%2Ff37S0tIaGhnBwcGNjY%2BXl5ZKSkoiIiKmpqW5ubpeXl29vb9XV1Y6Oju3t7WVlZXZ2dpiYmG1tbXx8fO%2Fv7%2Bfn57GxsbOzs%2FHx8Xl5eVpaWmRkZE1NTXNzc2dnZ5aWloeHh%2BPj405OTmlpadvb23p6ev%2F%2F%2F%2F7%2B%2FgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABCABYAAAf%2FgFyCg4SFhoeIiYqLjI2Oj4xdkpOUlZaXl5BcJ42Ynp%2BYkZJcLEdCXJZcIwIaqKCvoKJdIUAeUSKuXYIuNB5VF5QVWgiwXQjDlwdaWrqLo00yAxZFWq6qJA0DHj6SBAtb4AsEXQBbzJUABeBbBQCUCusFL1wB6%2BuDoxlbHwMJVDaCRtCwMAALDhRdImxZEEFLhAIGyJmrZGALAwJaCDDYElGigYwbLtDjGKBkAHz5SiQY0EDFDBfYBkixEgJVgQIHJuWUeE4Sgi0CKgmYOJSSoHoPDhmtUIIfBSTYJiToIbKLli3uLJXrybPSVQVdKirYeXRLUkOVuMRIAmGAAw4D%2FyAMqSlp6yW7k4paAtqlgrotGxCUbSGgsAKURlEYoTBgQoMOrSbhRTcx75ZLfLscAPDN7EjChhFP4qIkCGOWDHRNIoD1bmVJ8MZRYp1VMseRZwulnTElGwUHcU1gcHXg5k5jOSdbzWyZmOZJQHErHZ1ChQRpWUA4mAChw3BJChk6LLBgM0cA6JlVvJhxI9iw7DdsOVnPgMkARARRB3E9AYwrLziwnQTCueJNPOOUY09W6ayzQG0NgnPYSPZ4Zo0IIEAARQIlZCBIDQJOIEEHJ1ByjHOvnHjJMjlFwsUDOqzkXwyoCLKCBBxwIMMNxfSYijNcOMEABB9s4aFRK1iQQDAOIvjo5CjO6MICD09UkAuUTPyww5VPwiILFxpUdQkGS3DZ5SuyNOOJfmf6mGaPgQAAOw%3D%3D',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <table> \
          <tbody> \
            <tr> \
              <td class="tl"/><td class="b"/><td class="tr"/> \
            </tr> \
            <tr> \
              <td class="b"/> \
              <td class="body"> \
                <div class="content"> \
                </div> \
                <div class="footer"> \
                  <a href="#" class="close"> \
                    <img src="data:image/gif;base64,R0lGODlhQgAWAOYAAMDAwMHBwZ2dnVlZWdLS0oODg6%2Bvr%2FX19eTk5FBQULi4uIyMjJSUlFRUVFZWVtzc3FJSUsnJyVFRUVhYWFVVVezs7FNTU%2Fb29v39%2Ferq6vr6%2BqampldXV6KiokxMTE9PT2ZmZvf3993d3czMzGBgYHt7e6Ghofz8%2FPDw8N7e3mxsbLW1tfv7%2B5WVlc3NzcrKynh4eOvr60tLS%2BDg4F9fX7m5ud%2Ff37S0tIaGhnBwcGNjY%2BXl5ZKSkoiIiKmpqW5ubpeXl29vb9XV1Y6Oju3t7WVlZXZ2dpiYmG1tbXx8fO%2Fv7%2Bfn57GxsbOzs%2FHx8Xl5eVpaWmRkZE1NTXNzc2dnZ5aWloeHh%2BPj405OTmlpadvb23p6ev%2F%2F%2F%2F7%2B%2FgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABCABYAAAf%2FgFyCg4SFhoeIiYqLjI2Oj4xdkpOUlZaXl5BcJ42Ynp%2BYkZJcLEdCXJZcIwIaqKCvoKJdIUAeUSKuXYIuNB5VF5QVWgiwXQjDlwdaWrqLo00yAxZFWq6qJA0DHj6SBAtb4AsEXQBbzJUABeBbBQCUCusFL1wB6%2BuDoxlbHwMJVDaCRtCwMAALDhRdImxZEEFLhAIGyJmrZGALAwJaCDDYElGigYwbLtDjGKBkAHz5SiQY0EDFDBfYBkixEgJVgQIHJuWUeE4Sgi0CKgmYOJSSoHoPDhmtUIIfBSTYJiToIbKLli3uLJXrybPSVQVdKirYeXRLUkOVuMRIAmGAAw4D%2FyAMqSlp6yW7k4paAtqlgrotGxCUbSGgsAKURlEYoTBgQoMOrSbhRTcx75ZLfLscAPDN7EjChhFP4qIkCGOWDHRNIoD1bmVJ8MZRYp1VMseRZwulnTElGwUHcU1gcHXg5k5jOSdbzWyZmOZJQHErHZ1ChQRpWUA4mAChw3BJChk6LLBgM0cA6JlVvJhxI9iw7DdsOVnPgMkARARRB3E9AYwrLziwnQTCueJNPOOUY09W6ayzQG0NgnPYSPZ4Zo0IIEAARQIlZCBIDQJOIEEHJ1ByjHOvnHjJMjlFwsUDOqzkXwyoCLKCBBxwIMMNxfSYijNcOMEABB9s4aFRK1iQQDAOIvjo5CjO6MICD09UkAuUTPyww5VPwiILFxpUdQkGS3DZ5SuyNOOJfmf6mGaPgQAAOw%3D%3D" title="close" class="close_image" /> \
                  </a> \
                </div> \
              </td> \
              <td class="b"/> \
            </tr> \
            <tr> \
              <td class="bl"/><td class="b"/><td class="br"/> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init();
      if ($('#facebox .loading').length == 1) {
        return true;
      }
      showOverlay();

      $('#facebox .content').empty();
      $('#facebox .body').children().hide().end()
        .append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>');

      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	385.5
      }).show();

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) {
          $.facebox.close();
        }
        return true;
      });
      $(document).trigger('loading.facebox');
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox');
      if (klass) {
        $('#facebox .content').addClass(klass);
      }
      $('#facebox .content').append(data);
      $('#facebox .loading').remove();
      $('#facebox .body').children().fadeIn('normal');
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox table').width() / 2));
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
    },

    close: function() {
      $(document).trigger('close.facebox');
      return false;
    }
  });

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    init(settings);

    return this.click(function() {
      $.facebox.loading(true);

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/);
      if (klass) {
        klass = klass[1];
      }

      fillFaceboxFromHref(this.href, klass);
      return false;
    });
  };

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) {
      return true;
    } else {
      $.facebox.settings.inited = true;
    }

    $(document).trigger('init.facebox');
    makeCompatible();

    var imageTypes = $.facebox.settings.imageTypes.join('|');
    $.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i');

    if (settings) {
      $.extend($.facebox.settings, settings);
    }
    $('body').append($.facebox.settings.faceboxHtml);

    var preload = [ new Image(), new Image() ];
    preload[0].src = $.facebox.settings.closeImage;
    preload[1].src = $.facebox.settings.loadingImage;

    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image());
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1');
    });

    $('#facebox .close').click($.facebox.close);
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage);
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll);
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight;
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings;

    $s.loadingImage = $s.loading_image || $s.loadingImage;
    $s.closeImage = $s.close_image || $s.closeImage;
    $s.imageTypes = $s.image_types || $s.imageTypes;
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml;
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0];
      var target = href.replace(url,'');
      $.facebox.reveal($(target).clone().show(), klass);

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass);
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass);
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image();
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass);
    };
    image.src = href;
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) {
      $.facebox.reveal(data, klass);
    });
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null;
  }

  function showOverlay() {
    if (skipOverlay()) {
      return;
    }

    if ($('facebox_overlay').length == 0) {
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');
    }

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { $(document).trigger('close.facebox') })
      .fadeIn(200);
    return false;
  }

  function hideOverlay() {
    if (skipOverlay()) {
      return;
    }

    $('#facebox_overlay').fadeOut(200, function() {
      $("#facebox_overlay").removeClass("facebox_overlayBG");
      $("#facebox_overlay").addClass("facebox_hide");
      $("#facebox_overlay").remove();
    });

    return false;
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox');
    $('#facebox').fadeOut(function() {
      $('#facebox .content').removeClass().addClass('content');
      hideOverlay();
      $('#facebox .loading').remove();
    });
  });
})(jQuery);
