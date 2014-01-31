$.getScriptLite = (src) ->
    script = $('<script/>',
        src: src,
        type: 'text/javascript',
        async: 'async',
        defer: 'defer'
    ).get(0)
    $('head').get(0).appendChild(script)

$ ->
    fancyBoxEffects =
        openEffect: 'elastic'
        openEasing: 'easeOutBack'
        closeEffect: 'elastic'
        closeEasing: 'easeInBack'

    $('.content a:regex(href, png|jpe?g|gif)').fancybox(fancyBoxEffects)

    if document.getElementsByTagName('plusone').length > 0
        $('plusone').replaceWith('<g:plusone size="medium"></g:plusone>')
        $.getScriptLite('//apis.google.com/js/plusone.js')

    if document.getElementById('fb-root')
        $.getScriptLite('//connect.facebook.net/en_US/all.js#appId=286712658022064&xfbml=1')

    if document.getElementById('rdbWrapper')
        $.getScriptLite('//www.readability.com/embed.js')

    if document.getElementsByClassName('twitter-share-button').length > 0
        $.getScriptLite('//platform.twitter.com/widgets.js')
