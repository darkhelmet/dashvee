package controllers

import (
    // "github.com/darkhelmet/blargh/errors"
    // "github.com/darkhelmet/blargh/post"
    "fmt"
    "github.com/robfig/revel"
    static "github.com/robfig/revel/modules/static/app/controllers"
    T "html/template"
    "regexp"
)

type PageLink struct {
    Name, Path, Class, Icon string
    After                   T.HTML
    Header, Footer          bool
}

var (
    feedburner    = regexp.MustCompile("(?i)feedburner")
    feedburnerUrl = "http://feeds.feedburner.com/VerboseLogging"
    posts         = NewRepo("posts")
    pages         = NewRepo("pages")
    middot        = T.HTML("&middot;")
    pageLinks     = []PageLink{
        PageLink{Name: "Home", Path: "/", Icon: "H", Header: true, Footer: true, After: middot},
        PageLink{Name: "About", Path: "/about", Icon: "A", Header: true, Footer: true, After: middot},
        PageLink{Name: "Talks", Path: "/talks", Icon: "E", Header: true, Footer: true, After: middot},
        PageLink{Name: "Projects", Path: "/projects", Icon: "P", Header: true, Footer: true, After: middot},
        PageLink{Name: "Contact", Path: "/contact", Icon: "C", Header: true, Footer: true, After: middot},
        PageLink{Name: "Disclaimer", Path: "/disclaimer", Icon: "D", Header: true, Footer: true, After: middot},
        PageLink{Name: "Sitemap", Path: "/sitemap.xml", Footer: true},
    }
)

func defaultRenderArgs(c *revel.Controller) revel.Result {
    c.RenderArgs["SiteDescription"] = revel.Config.StringDefault("site.description", "")
    c.RenderArgs["Description"] = c.RenderArgs["SiteDescription"]
    c.RenderArgs["SiteContact"] = revel.Config.StringDefault("site.contact", "")
    c.RenderArgs["SiteTitle"] = revel.Config.StringDefault("site.title", "")
    c.RenderArgs["SiteAuthor"] = revel.Config.StringDefault("site.author", "")
    c.RenderArgs["GoogleAnalytics"] = revel.Config.StringDefault("analytics.ga", "")
    c.RenderArgs["Gauges"] = revel.Config.StringDefault("analytics.gauges", "")
    c.RenderArgs["PageLinks"] = pageLinks
    return nil
}

func init() {
    revel.InterceptFunc(defaultRenderArgs, revel.BEFORE, &App{})
    revel.InterceptFunc(defaultRenderArgs, revel.BEFORE, &static.Static{})
}

type App struct {
    *revel.Controller
}

func (c App) Index() revel.Result {
    canonical := "/"
    posts, err := posts.FindLatest(6)
    if err != nil {
        revel.ERROR.Printf("failed finding latest posts: %s", err)
        return c.RenderError(err)
    }
    return c.Render(canonical, posts)
}

func (c App) OpenSearch() revel.Result {
    c.Response.ContentType = "application/xml; charset=utf-8"
    return c.RenderTemplate("App/OpenSearch.xml")
}

func (c App) Search() revel.Result {
    query := c.Params.Get("query")
    posts, err := posts.Search(query)
    if err != nil {
        revel.ERROR.Printf("failed finding posts with query %#v: %s", query, err)
        return c.RenderError(err)
    }
    title := fmt.Sprintf("Search results for %#v", query)
    return c.Render(query, posts, title)
}

func (c App) Feed() revel.Result {
    if !feedburner.Match([]byte(c.Request.Header.Get("User-Agent"))) {
        if "" == c.Params.Get("no_fb") {
            return c.Redirect(feedburnerUrl)
        }
    }

    posts, err := posts.FindLatest(10)
    if err != nil {
        revel.ERROR.Printf("failed getting posts for feed: %s", err)
        return c.RenderError(err)
    }

    c.Response.ContentType = "application/rss+xml; charset=utf-8"
    c.RenderArgs["posts"] = posts
    return c.RenderTemplate("App/Feed.xml")
}

func (c App) Sitemap() revel.Result {
    return c.RenderText("Sitemap")
}

func (c App) FullArchive() revel.Result {
    return c.RenderText("FullArchive")
}

func (c App) CategoryArchive() revel.Result {
    return c.RenderText("CategoryArchive")
}

func (c App) MonthlyArchive() revel.Result {
    return c.RenderText("MonthlyArchive")
}

func (c App) Monthly() revel.Result {
    return c.RenderText("Monthly")
}

func (c App) Category() revel.Result {
    return c.RenderText("Category")
}

func (c App) Permalink() revel.Result {
    return c.RenderText("Permalink")
}

func (c App) Tag() revel.Result {
    return c.RenderText("Tag")
}

func (c App) Page(slug string) revel.Result {
    return c.RenderText(slug)
}
