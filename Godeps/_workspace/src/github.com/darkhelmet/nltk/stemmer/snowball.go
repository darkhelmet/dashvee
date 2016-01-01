package stemmer

import (
	"github.com/darkhelmet/dashvee/Godeps/_workspace/src/bitbucket.org/tebeka/snowball"
)

func NewSnowball() (Stemmer, error) {
	return snowball.New("english")
}
