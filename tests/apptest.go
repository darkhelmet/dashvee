package tests

import (
    "github.com/darkhelmet/dashvee/app/controllers"
    "github.com/robfig/revel"
)

type AppTest struct {
    revel.TestSuite
}

func (t AppTest) TestPostsLoad() {
    controllers.NewRepo("posts")
}

func (t AppTest) TestPagesLoad() {
    controllers.NewRepo("pages")
}

func (t AppTest) TestTimeZones() {
    repo := controllers.NewRepo("posts")
    posts, _ := repo.All()
    for _, post := range posts {
        name, offset := post.PublishedOn.Zone()
        t.Assertf(offset != 0, "got offset 0 in zone %s for %s, expected not 0", name, post.Title)
    }
}

func (t AppTest) assertNotFound() {
    t.AssertNotFound()
    t.AssertContentType("text/html; charset=utf-8")
    t.AssertContains("Every time you get a 404, a kitten cries. You should probably click on some links. If this URL was supposed to work, maybe you could let me know about it.")
}

func (t AppTest) Test404() {
    t.Get("/foo/bar/baz")
    t.assertNotFound()
}

func (t AppTest) TestIndex() {
    t.Get("/")
    t.AssertOk()
    t.AssertContentType("text/html")
}

func (t AppTest) TestOpenSearch() {
    t.Get("/opensearch.xml")
    t.AssertOk()
    t.AssertContentType("application/xml; charset=utf-8")
}

func (t AppTest) TestSearch() {
    t.Get("/search?query=cucumber")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains(`Search results for &#34;cucumber&#34;`)
    t.AssertContains("Debugging Cucumber On Rails")
    t.AssertContains("Riding Rails With Selenium")
    t.AssertContains("Using Ruby&#39;s Eval To Make Cucumber Bigger And Greener")
}

func (t AppTest) TestFeed() {
    t.Get("/feed?no_fb=true")
    t.AssertOk()
    t.AssertContentType("application/rss+xml; charset=utf-8")
    t.AssertContains("<title>Verbose Logging</title>")
}

func (t AppTest) TestSitemap() {
    t.Get("/sitemap.xml")
    t.AssertOk()
    t.AssertContentType("application/xml; charset=utf-8")
    t.AssertContains("/disclaimer")
    t.AssertContains("/worth-watching-twice-joel-spolsky-railsconf-08-keynote")
}

func (t AppTest) TestFullArchive() {
    t.Get("/archive/full")
    t.AssertOk()
    t.AssertContentType("text/html")
}

func (t AppTest) TestCategoryArchive() {
    t.Get("/archive/category")
    t.AssertOk()
    t.AssertContentType("text/html")
}

func (t AppTest) TestMonthlyArchive() {
    t.Get("/archive/month")
    t.AssertOk()
    t.AssertContentType("text/html")
}

func (t AppTest) TestMonthly() {
    t.Get("/2013/05")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains("Archives for 5/2013")
}

func (t AppTest) TestCategory() {
    t.Get("/category/editorial")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains("Editorial Articles")
}

func (t AppTest) TestPermalink() {
    t.Get("/2013/05/01/ruby-batteries-included")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains("Ruby Batteries Included")
    t.AssertContains("Salt Lake City, Utah")
}

func (t AppTest) TestNotFoundPermalink() {
    t.Get("/1999/05/01/batman")
    t.assertNotFound()
}

func (t AppTest) TestTag() {
    t.Get("/tag/ruby")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains(`Articles tagged with &#34;ruby&#34;`)
    t.AssertContains("Ruby Batteries Included")
}

func (t AppTest) TestPage() {
    t.Get("/about")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains("I am a software engineer")
}

func (t AppTest) TestNotFoundPage() {
    t.Get("/cobol")
    t.assertNotFound()
}

func (t AppTest) TestProgrammingJournals() {
    t.Get("/2012/09/03/on-programming-journals")
    t.AssertOk()
    t.AssertContentType("text/html")
    t.AssertContains("On Programming Journals")
}
