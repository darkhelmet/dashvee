package post

import (
	"time"
)

const TimeFormat = "02 Jan 2006 15:04 MST"

type Time struct {
	time.Time
}

func (t *Time) SetYAML(tag string, value interface{}) bool {
	s, ok := value.(string)
	if !ok {
		return false
	}
	parsed, err := time.Parse(TimeFormat, s)
	if err != nil {
		return false
	}
	t.Time = parsed
	return true
}
