package app

import (
    "crypto/md5"
    "encoding/json"
    "fmt"
    "github.com/darkhelmet/blargh/post"
    "github.com/darkhelmet/dashvee/app/config"
    "github.com/darkhelmet/webutil"
    "github.com/robfig/revel"
    T "html/template"
    "io"
    "log"
    "os"
    "strings"
    "time"
    "unicode"
    "unicode/utf8"
)

type Formatter interface {
    Format(string) string
}

type TimeZoner interface {
    In(*time.Location) time.Time
}

type Manifest struct {
    Assets map[string]string
}

func (m Manifest) path(format string, rest ...interface{}) string {
    return fmt.Sprintf("%s/assets/%s", config.AssetHost, m.Assets[fmt.Sprintf(format, rest...)])
}

func (m Manifest) StylesheetPath(name string) string {
    return m.path("stylesheets/%s.css", name)
}

func (m Manifest) JavascriptPath(name string) string {
    return m.path("javascripts/%s.js", name)
}

func (m Manifest) ImagePath(name string) string {
    return m.path("images/%s", name)
}

func (m Manifest) Len() int {
    return len(m.Assets)
}

var assets = Manifest{make(map[string]string)}

func gravatar(email string) string {
    email = strings.TrimFunc(email, unicode.IsSpace)
    email = strings.ToLower(email)
    hash := md5.New()
    io.WriteString(hash, email)
    return fmt.Sprintf("http://www.gravatar.com/avatar/%x.png", hash.Sum(nil))
}

func categoryPath(i interface{}) string {
    switch thing := i.(type) {
    case *post.Post:
        return fmt.Sprintf("/category/%s", thing.Category)
    case string:
        return fmt.Sprintf("/category/%s", thing)
    default:
        panic("YOU SHALL NOT PASS!!!")
    }
}

func truncate(length int, s string) string {
    if length < utf8.RuneCountInString(s) {
        trimmed := []rune(s)[0:length]
        trimmed[length-1] = '…'
        return string(trimmed)
    }
    return s
}

func PostCanonical(p *post.Post) string {
    return fmt.Sprintf("/%s/%s", p.PublishedOn.Format("2006/01/02"), p.Slug())
}

func PageCanonical(p *post.Post) string {
    return "/" + p.Slug()
}

func setupAssets() {
    file, err := os.Open("public/assets/manifest.json")
    if err != nil {
        log.Fatalf("failed opening manifest file: %s", err)
    }
    defer file.Close()
    err = json.NewDecoder(file).Decode(&assets)
    if err != nil {
        log.Fatalf("failed decoding manifest file: %s", err)
    }
}

func init() {
    // Filters is the default set of global filters.
    revel.Filters = []revel.Filter{
        revel.PanicFilter,       // Recover from panics and display an error page instead.
        revel.RouterFilter,      // Use the routing table to select the right Action
        revel.ParamsFilter,      // Parse parameters into Controller.Params.
        revel.InterceptorFilter, // Run interceptors around the action.
        revel.ActionInvoker,     // Invoke the action.
    }

    revel.OnAppStart(func() {
        handler := revel.Server.Handler
        handler = webutil.GzipHandler{handler}
        handler = webutil.CanonicalHostHandler{handler, config.CanonicalHost, "http"}
        handler = webutil.EnsureRequestBodyClosedHandler{handler}
        revel.Server.Handler = handler
    })

    revel.TemplateFuncs["Time"] = func(s int64) time.Time { return time.Unix(-s, 0) }
    revel.TemplateFuncs["CanonicalUrl"] = func(path string) string { return fmt.Sprintf("http://%s%s", config.CanonicalHost, path) }
    revel.TemplateFuncs["Truncate"] = truncate
    revel.TemplateFuncs["Titleize"] = strings.Title
    revel.TemplateFuncs["Safe"] = func(s string) T.HTML { return T.HTML(s) }
    revel.TemplateFuncs["HTML"] = revel.TemplateFuncs["Safe"]
    revel.TemplateFuncs["HTMLAttr"] = func(s string) T.HTMLAttr { return T.HTMLAttr(s) }

    revel.TemplateFuncs["StylesheetPath"] = assets.StylesheetPath
    revel.TemplateFuncs["JavascriptPath"] = assets.JavascriptPath
    revel.TemplateFuncs["ImagePath"] = assets.ImagePath

    revel.TemplateFuncs["ISO8601"] = func(t Formatter) string { return t.Format(time.RFC3339) }
    revel.TemplateFuncs["RFC822"] = func(t Formatter) string { return t.Format(time.RFC822) }
    revel.TemplateFuncs["DisplayTime"] = func(t Formatter) string { return t.Format(revel.Config.StringDefault("time.display", "")) }
    revel.TemplateFuncs["UTC"] = func(t TimeZoner) time.Time { return t.In(time.UTC) }

    revel.TemplateFuncs["Gravatar"] = gravatar
    revel.TemplateFuncs["CategoryPath"] = categoryPath
    revel.TemplateFuncs["ArchivePath"] = func(name string) string { return fmt.Sprintf("/archive/%s", name) }
    revel.TemplateFuncs["MonthlyPath"] = func(t Formatter) string { return t.Format("/2006/01") }
    revel.TemplateFuncs["TagPath"] = func(tag string) string { return fmt.Sprintf("/tag/%s", tag) }
    revel.TemplateFuncs["PostCanonical"] = PostCanonical
    revel.TemplateFuncs["PageCanonical"] = PageCanonical

    setupAssets()
}
