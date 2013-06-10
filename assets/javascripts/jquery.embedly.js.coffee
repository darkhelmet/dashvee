class @Embedly
    @templates:
        photo: Handlebars.compile("<a href='{{url}}' target='_blank'><img style='{{imageStyle}}' src='{{oembed.url}}' alt='{{title}}' /></a>")
        wrap: Handlebars.compile("<{{element}} class='{{class}}'>{{{code}}}</{{element}}>")
        thumb: Handlebars.compile("<img src='{{src}}' class='thumb' style='{{style}}'/>")
        description: Handlebars.compile("<div class='description'>{{description}}</div>")
        provider: Handlebars.compile("<a href='{{url}}' class='provider'>{{name}}</a>")
        link: Handlebars.compile("<a href='{{url}}'>{{title}}</a>")

    @defaults:
        scheme:         'http:'     # The scheme to use, http: or https:
        frame:          false       # serves all embeds within an iframe to avoid XSS issues
        wmode:          'opaque'    # for flash elements set a wmode
        method:         'replace'   # embed handling option for standard callback
        addImageStyles: true        # style="" attribute to images for maxWidth and maxHeight
        wrapElement:    'div'       # standard wrapper around all returned embeds
        className:      'embed'     # class on the wrapper element

    constructor: (@options, @elements, @callback) ->
        @callback ?= @embed
        @dict = {}
        urls = []
        for element in elements
            urls.push(element.href)
            @dict[element.href] = element

        url = "#{@options.scheme}//api.embed.ly/1/oembed"
        request = $.ajax
            url: url
            dataType: 'jsonp'
            data: @buildParams(urls)

        request.done(@processEmbeds)

    buildParams: (urls) ->
        params =
            key: @options.key
            urls: urls.map(escape).join(',')

        params.maxWidth ?= @options.maxWidth
        params.maxHeight ?= @options.maxHeight
        params.chars ?= @options.chars
        params.words ?= @options.words
        params.frame ?= @options.frame
        params.wmode = @options.wmode

        ("#{k}=#{v}" for own k, v of params when v?).join('&')

    embed: (oembed, elem) =>
        switch @options.method
            when 'replace'
                $(elem).replaceWith(oembed.code)
            when 'after'
                $(elem).after(oembed.code)
            when 'afterParent'
                $(elem).parent().after(oembed.code)
            when 'replaceParent'
                $(elem).parent().replaceWith(oembed.code)

    createImageStyle: ->
        style = []
        if @options.addImageStyles
            if @options.maxWidth?
                style.push("max-width: #{@options.maxWidth}px")

            if @options.maxHeight?
                style.push("max-height: #{@options.maxHeight}px")
        style.join(';')

    processEmbeds: (oembeds) =>
        @processEmbed(oembed, @elements[index]) for oembed, index in oembeds

    processEmbed: (oembed, elem) ->
        code = switch oembed.type
            when 'photo'
                title = oembed.title || ''
                Embedly.templates.photo(url: elem.href, imageStyle: @createImageStyle(), title: title, oembed: oembed)
            when 'video', 'rich'
                oembed.html
            else
                title = oembed.title || elem.href;
                thumb = if oembed.thumbnail_url? then Embedly.templates.thumb(src: oembed.thumbnail_url, style: @createImageStyle()) else ''
                description = if oembed.description? then Embedly.templates.description(description: oembed.description) else ''
                provider = if oembed.provider_name? then Embedly.templates.provider(url: oembed.provider_url, name: oembed.provider_name)
                link = Embedly.templates.link(url: elem.href, title: title)
                [thumb, link, provider, description].join()

        if @options.wrapElement is 'div' && $.browser.msie && $.browser.version < 9
            @options.wrapElement = 'span'

        if @options.wrapElement
            code = Embedly.templates.wrap(element: @options.wrapElement, class: @options.className, code: code)

        oembed.code = code;
        $(elem).data('oembed', oembed).trigger('embedly:oembed', oembed)
        @callback(oembed, elem)

(($) ->
    $.fn.embedly = (options, callback) ->
        elements = $(this).filter -> options.re.test(this.href)
        return if elements.length is 0
        options = $.extend({}, Embedly.defaults, options)
        new Embedly(options, elements, callback)
)(jQuery)
