package blargh

import (
	"time"

	"github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/darkhelmet/blargh/filerepo"
	. "github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/darkhelmet/blargh/post"
)

func NewFileRepo(dir string) (Repo, error) {
	return filerepo.New(dir)
}

type Repo interface {
	Len() int
	All() (PostList, error)
	FindByTag(string) (PostList, error)
	FindByCategory(string) (PostList, error)
	FindLatest(limit int) (PostList, error)
	FindByMonth(year int, month time.Month) (PostList, error)
	Search(string) (PostList, error)
	FindBySlug(string) (*Post, error)
}
