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
