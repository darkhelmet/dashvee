(function(){$.getScriptLite=function(e){var t;return t=$("<script/>",{src:e,type:"text/javascript",async:"async",defer:"defer"}).get(0),$("head").get(0).appendChild(t)},$(function(){var e;Embedly.defaults.key="fd17fbebd90947588f7bbf26f04bceea",e={openEffect:"elastic",openEasing:"easeOutBack",closeEffect:"elastic",closeEasing:"easeInBack"},$(".content a:regex(href, png|jpe?g|gif)").fancybox(e),$(".content a").embedly({re:/(youtube|vimeo)\.com/i,maxWidth:640,wmode:"opaque"}),$(".content a.twitter").embedly({re:/twitter\.com/i,maxWidth:640}),$(".content a").embedly({re:/slideshare\.net/i,maxWidth:640}),$(".content a").embedly({re:/twitter\.com/i},function(t,n){return $(n).attr("title",t.description),$(n).click(function(){var n;return n=$('<div class="embedly" />',{html:t.code}),$.fancybox(n,e),!1})}),document.getElementsByTagName("plusone").length>0&&($("plusone").replaceWith('<g:plusone size="medium"></g:plusone>'),$.getScriptLite("//apis.google.com/js/plusone.js")),document.getElementById("fb-root")&&$.getScriptLite("//connect.facebook.net/en_US/all.js#appId=286712658022064&xfbml=1"),document.getElementById("rdbWrapper")&&$.getScriptLite("//www.readability.com/embed.js");if(document.getElementsByClassName("twitter-share-button").length>0)return $.getScriptLite("//platform.twitter.com/widgets.js")})}).call(this);