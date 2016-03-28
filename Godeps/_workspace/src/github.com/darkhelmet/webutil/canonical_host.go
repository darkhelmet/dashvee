package webutil

import (
	"log"
	"net/http"
	"net/url"
)

type CanonicalHostHandler struct {
	H                     http.Handler
	CanonicalHost, Scheme string
}

func (chh CanonicalHostHandler) replaceHost(u url.URL) string {
	u.Host = chh.CanonicalHost
	u.Scheme = chh.Scheme
	return u.String()
}

func (chh CanonicalHostHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("canonical host: %s", r.Host)
	if r.Host != chh.CanonicalHost {
		u := chh.replaceHost(*r.URL)
		http.Redirect(w, r, u, http.StatusMovedPermanently)
		return
	}
	chh.H.ServeHTTP(w, r)
}
