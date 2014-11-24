package post

import (
	"time"
)

type PostList []*Post

func (pl PostList) Len() int {
	return len(pl)
}

func (pl PostList) Less(i, j int) bool {
	return pl[i].PublishedOn.After(pl[j].PublishedOn.Time)
}

func (pl PostList) Swap(i, j int) {
	pl[i], pl[j] = pl[j], pl[i]
}

// Assumes the list is sorted given the above functions already.
func (pl PostList) PublishedBefore(t time.Time) PostList {
	for index, post := range pl {
		if post.PublishedOn.Before(t) {
			return pl[index:]
		}
	}
	return make(PostList, 0)
}
