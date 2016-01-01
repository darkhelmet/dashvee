package controllers

import (
	"fmt"
	"time"

	"github.com/darkhelmet/blargh"
	"github.com/darkhelmet/blargh/errors"
	"github.com/darkhelmet/blargh/post"
)

type Repo struct {
	blargh.Repo
}

func NewRepo(dir string) *Repo {
	repo, err := blargh.NewFileRepo(dir)
	if err != nil {
		panic(err)
	}
	return &Repo{repo}
}

func (r *Repo) FindByPermalink(year int, month time.Month, day int, slug string) (*post.Post, error) {
	p, err := r.FindBySlug(slug)
	if err != nil {
		return nil, err
	}
	if p.OnDay(year, month, day) {
		return p, nil
	}
	return nil, errors.NotFound(fmt.Sprintf("Post not found"))
}
