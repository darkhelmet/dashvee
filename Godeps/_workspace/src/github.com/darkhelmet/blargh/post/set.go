package post

type PostSet struct {
	s map[string]*Post
}

func NewPostSet() *PostSet {
	return &PostSet{make(map[string]*Post)}
}

func (ps *PostSet) Add(p *Post) {
	ps.s[p.Id] = p
}

func (ps *PostSet) Len() int {
	return len(ps.s)
}

func (ps *PostSet) AddSet(other *PostSet) {
	for _, post := range other.s {
		ps.Add(post)
	}
}

func (ps *PostSet) Values() PostList {
	posts := make(PostList, 0, len(ps.s))
	for _, post := range ps.s {
		posts = append(posts, post)
	}
	return posts
}

func (ps *PostSet) Intersection(other *PostSet) *PostSet {
	if other.Len() < ps.Len() {
		return other.Intersection(ps)
	}

	intersection := NewPostSet()
	for _, post := range ps.s {
		if other.Contains(post) {
			intersection.Add(post)
		}
	}
	return intersection
}

func (ps *PostSet) Contains(p *Post) bool {
	_, ok := ps.s[p.Id]
	return ok
}
