(function() {
  var CanvasId, Chrome, Firefox, Headshot, ImageId, Radius, Retina, body, img;

  Retina = window.devicePixelRatio > 1 ? true : false;

  Firefox = window.navigator.userAgent.match(/firefox/i) != null;

  Chrome = window.navigator.userAgent.match(/chrome/i) != null;

  ImageId = 'blur-source';

  CanvasId = 'blur';

  Radius = 50;

  Headshot = document.getElementById('headshot');

  if (Modernizr.canvas && (Headshot != null) && (Firefox || Chrome) && !Retina) {
    body = document.getElementsByTagName('body')[0];
    img = document.createElement('img');
    img.crossOrigin = '';
    img.src = headshot.value;
    img.id = ImageId;
    img.onload = function() {
      var canvas;
      canvas = document.createElement('canvas');
      canvas.id = CanvasId;
      body.appendChild(canvas);
      try {
        return stackBlurImage(ImageId, CanvasId, Radius, false);
      } catch (e) {

      }
    };
    body.appendChild(img);
  }

}).call(this);
