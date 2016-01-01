package controllers

import (
	"fmt"
	T "html/template"
	"regexp"
	"strings"
	"time"

	"github.com/darkhelmet/blargh/errors"
	"github.com/darkhelmet/blargh/post"
	static "github.com/revel/modules/static/app/controllers"
	"github.com/revel/revel"
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
	posts, err := posts.FindLatest(posts.Len())
	if err != nil {
		revel.ERROR.Printf("failed getting posts for sitemap: %s", err)
		return c.RenderError(err)
	}

	pages, err := pages.FindLatest(pages.Len())
	if err != nil {
		revel.ERROR.Printf("failed getting pages for sitemap: %s", err)
		return c.RenderError(err)
	}

	c.Response.ContentType = "application/xml; charset=utf-8"
	c.RenderArgs["posts"] = posts
	c.RenderArgs["pages"] = pages
	return c.RenderTemplate("App/Sitemap.xml")
}

func (c App) FullArchive() revel.Result {
	posts, err := posts.FindLatest(posts.Len())
	if err != nil {
		revel.ERROR.Printf("failed getting posts for full archive: %s", err)
		return c.RenderError(err)
	}

	title := "Full Archive"
	description := title
	canonical := c.Request.URL.Path
	return c.Render(title, canonical, description, posts)
}

func (c App) CategoryArchive() revel.Result {
	posts, err := posts.FindLatest(posts.Len())
	if err != nil {
		revel.ERROR.Printf("failed getting posts for category archive: %s", err)
		return c.RenderError(err)
	}
	grouped := make(map[string][]*post.Post)
	for _, post := range posts {
		key := post.Category
		grouped[key] = append(grouped[key], post)
	}

	title := "Category Archive"
	description := "Archives by category"
	canonical := c.Request.URL.Path
	return c.Render(title, canonical, description, grouped)
}

func (c App) MonthlyArchive() revel.Result {
	posts, err := posts.FindLatest(posts.Len())
	if err != nil {
		revel.ERROR.Printf("failed getting posts for monthly archive: %s", err)
		return c.RenderError(err)
	}
	grouped := make(map[int64][]*post.Post)
	for _, post := range posts {
		t := post.PublishedOn
		key := -time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, time.Local).Unix()
		grouped[key] = append(grouped[key], post)
	}

	title := "Monthly Archive"
	description := "Archives by month"
	canonical := c.Request.URL.Path
	return c.Render(title, canonical, description, grouped)
}

func (c App) Monthly(year, month int) revel.Result {
	posts, err := posts.FindByMonth(year, time.Month(month))
	if err != nil {
		revel.ERROR.Printf("failed finding posts in month %#v of %#v: %s", month, year, err)
		return c.RenderError(err)
	}

	title := fmt.Sprintf("Archives for %d/%d", month, year)
	description := title
	canonical := c.Request.URL.Path
	return c.Render(posts, title, description, canonical)
}

func (c App) Category(category string) revel.Result {
	posts, err := posts.FindByCategory(category)
	if err != nil {
		revel.ERROR.Printf("failed finding posts with category %#v: %s", category, err)
		return c.RenderError(err)
	}
	category = strings.Title(category)
	title := fmt.Sprintf("%s Articles", category)
	description := fmt.Sprintf("Articles in the %s category", category)
	canonical := c.Request.URL.Path
	return c.Render(posts, title, description, canonical)
}

func (c App) Slug(slug string) revel.Result {
	post, err := posts.FindBySlug(slug)
	if err != nil {
		switch err.(type) {
		case errors.NotFound:
			return c.NotFound("")
		default:
			revel.ERROR.Printf("failed finding post with slug(%#v): %s (%T)", slug, err, err)
			return c.RenderError(err)
		}
	}

	title := post.Title
	description := post.Description
	return c.Render(post, title, description)
}

func (c App) Permalink(year, month, day int, slug string) revel.Result {
	post, err := posts.FindByPermalink(year, time.Month(month), day, slug)
	if err != nil {
		switch err.(type) {
		case errors.NotFound:
			return c.NotFound("")
		default:
			revel.ERROR.Printf("failed finding post with year(%#v) month(%#v) day(%#v) slug(%#v): %s (%T)", year, month, day, slug, err, err)
			return c.RenderError(err)
		}
	}

	title := post.Title
	description := post.Description
	return c.Render(post, title, description)
}

func (c App) Tag(tag string) revel.Result {
	posts, err := posts.FindByTag(tag)
	if err != nil {
		revel.ERROR.Printf("failed finding posts with tag %#v: %s", tag, err)
		return c.RenderError(err)
	}
	title := fmt.Sprintf("Articles tagged with %#v", tag)
	description := fmt.Sprintf("Articles with the %#v tag", tag)
	canonical := c.Request.URL.Path
	return c.Render(posts, title, description, canonical)
}

func (c App) Page(slug string) revel.Result {
	page, err := pages.FindBySlug(slug)
	if err != nil {
		switch err.(type) {
		case errors.NotFound:
			return c.NotFound("")
		default:
			revel.ERROR.Printf("failed finding page with slug %#v: %s (%T)", slug, err, err)
			return c.RenderError(err)
		}
	}

	title := page.Title
	description := page.Description
	return c.Render(page, title, description)
}
