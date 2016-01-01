package app

import (
	"fmt"
	"github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/revel/revel"
)

func init() {
	revel.OnAppStart(func() {
		fmt.Println("Go to /@tests to run the tests.")
	})
}
