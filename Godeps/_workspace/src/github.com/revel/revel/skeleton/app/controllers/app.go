package controllers

import "github.com/darkhelmet/dashvee/Godeps/_workspace/src/github.com/revel/revel"

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}
