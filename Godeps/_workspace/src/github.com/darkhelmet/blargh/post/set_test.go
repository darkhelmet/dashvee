package post_test

import (
	"github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/darkhelmet/blargh/post"
	. "launchpad.net/gocheck"
)

func (ts *TestSuite) TestAdd(c *C) {
	ps := post.NewPostSet()
	post := &post.Post{Id: "foo"}
	c.Assert(ps.Len(), Equals, 0)
	ps.Add(post)
	c.Assert(ps.Len(), Equals, 1)
	c.Assert(ps.Contains(post), Equals, true)
}

func (ts *TestSuite) TestIntersection(c *C) {
	ps1 := post.NewPostSet()
	ps2 := post.NewPostSet()

	p1 := &post.Post{Id: "foo"}
	p2 := &post.Post{Id: "bar"}
	p3 := &post.Post{Id: "baz"}

	ps1.Add(p1)
	ps1.Add(p2)
	ps2.Add(p2)
	ps2.Add(p3)

	in := ps1.Intersection(ps2)
	c.Assert(in.Len(), Equals, 1)
	c.Assert(in.Contains(p2), Equals, true)
}
