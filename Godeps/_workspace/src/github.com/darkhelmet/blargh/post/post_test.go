package post_test

import (
	T "html/template"
	"testing"
	"time"

	"github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/darkhelmet/blargh/post"
	. "launchpad.net/gocheck"
)

func Test(t *testing.T) { TestingT(t) }

type TestSuite struct{}

func mustParseTime(s string) time.Time {
	t, err := time.Parse(post.TimeFormat, s)
	if err != nil {
		panic(err)
	}
	return t
}

var (
	_      = Suite(&TestSuite{})
	monday = mustParseTime("10 Dec 2012 10:00 MST")
)

func (ts *TestSuite) TestLoadPost(c *C) {
	post, err := post.FromFile("test/my-first-post.md")
	c.Assert(err, IsNil)
	c.Assert(post.Id, Equals, "foobar")
	c.Assert(post.Category, Equals, "editorial")
	c.Assert(post.Description, Equals, "Just a first post to get things going.")
	c.Assert(post.Body, Equals, `This is my first post.

## How are ya'll?

* Foo
* Bar
* Baz`)
	c.Assert(post.Published, Equals, true)
	c.Assert(post.PublishedOn.Equal(monday), Equals, true)
	c.Assert(post.Slugs, DeepEquals, []string{"my-first-post", "my-fist-post"})
	c.Assert(post.Slug(), Equals, "my-first-post")
	c.Assert(post.Tags, DeepEquals, []string{"meta", "foo", "bar"})
}

func (ts *TestSuite) TestRequireSlugs(c *C) {
	_, err := post.FromFile("test/no-slug.md")
	c.Assert(err, NotNil)
}

func (ts *TestSuite) TestSetsIdIfNoneSet(c *C) {
	post, err := post.FromFile("test/my-second-post.md")
	c.Assert(err, IsNil)
	c.Assert(post.Id, Not(Equals), "")
}

func (ts *TestSuite) TestMarkdown(c *C) {
	p, err := post.FromFile("test/html.md")
	c.Assert(err, IsNil)
	c.Assert(p.HTML, Equals, T.HTML("<p>Hello, World!</p>\n\n<h1>How is everybody today?</h1>\n"))
}

func (ts *TestSuite) TestInlineHTML(c *C) {
	p, err := post.FromFile("test/inline-html.md")
	c.Assert(err, IsNil)
	c.Assert(p.HTML, Equals, T.HTML("<p>Hello, World!</p>\n\n<h1>How is everybody today?</h1>\n\n<p><img class=\"round bbottom bleft\" src=\"/foo.jpg\" /></p>\n"))
}

func (ts *TestSuite) TestClean(c *C) {
	p, err := post.FromFile("test/clean.md")
	c.Assert(err, IsNil)
	c.Assert(p.Clean(), Equals, "Hello, World! How is everybody today? Google Foo Bar Baz")
}

func (ts *TestSuite) TestImages(c *C) {
	p, err := post.FromFile("test/images.md")
	c.Assert(err, IsNil)
	c.Assert(p.HTML, Equals, T.HTML("<p>http://cdn.host.com/batman.jpg</p>\n"))
}
