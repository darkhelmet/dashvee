package app

import (
    "crypto/md5"
    "dashvee/app/config"
    "encoding/json"
    "fmt"
    "github.com/darkhelmet/blargh/post"
    "github.com/darkhelmet/webutil"
    "github.com/robfig/revel"
    T "html/template"
    "io"
    "io/ioutil"
    "log"
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

var assets = make(map[string]string)

func assetPath(name string) string {
    return fmt.Sprintf("%s/assets/%s", config.AssetHost, assets[name])
}

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

// type RenderInfo struct {
//     Page                                               interface{}
//     Title, PageTitle, Description, Canonical, Gravatar string
//     Error, NotFound, ArchiveLinks                      bool

//     SiteTitle, SiteDescription, SiteContact, SiteAuthor             string
//     PageLinks                                                       []PageLink
//     PostPreview, Post, FullArchive, CategoryArchive, MonthlyArchive interface{}
// }

func setupAssets() {
    data, err := ioutil.ReadFile("public/assets/manifest.json")
    if err != nil {
        log.Fatalf("failed to read asset manifest file: %s", err)
    }
    manifest := make(map[string]interface{})
    err = json.Unmarshal(data, &manifest)
    if err != nil {
        log.Fatalf("failed parsing manifest file: %s", err)
    }
    pairs := manifest["assets"].(map[string]interface{})
    for key, path := range pairs {
        assets[key] = path.(string)
    }
}

func init() {
    // Filters is the default set of global filters.
    revel.Filters = []revel.Filter{
        revel.PanicFilter,       // Recover from panics and display an error page instead.
        revel.RouterFilter,      // Use the routing table to select the right Action
        revel.ParamsFilter,      // Parse parameters into Controller.Params.
        revel.I18nFilter,        // Resolve the requested language
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

    revel.TemplateFuncs["AssetPath"] = assetPath
    revel.TemplateFuncs["StylesheetPath"] = func(name string) string { return assetPath(fmt.Sprintf("stylesheets/%s.css", name)) }
    revel.TemplateFuncs["JavascriptPath"] = func(name string) string { return assetPath(fmt.Sprintf("javascripts/%s.js", name)) }
    revel.TemplateFuncs["ImagePath"] = func(name string) string { return assetPath(fmt.Sprintf("images/%s", name)) }

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

// func RenderLayout(w io.Writer, data *RenderInfo) {
//     data.SiteTitle = config.SiteTitle
//     data.SiteDescription = config.SiteDescription
//     data.SiteContact = config.SiteContact
//     data.SiteAuthor = config.SiteAuthor
//     data.PageLinks = pageLinks
//     err := templates.ExecuteTemplate(w, "layout.tmpl", data)
//     if err != nil {
//         logger.Printf("error rendering template: %s", err)
//     }
// }

// func RenderPartial(w io.Writer, name string, data interface{}) {
//     err := templates.ExecuteTemplate(w, name, data)
//     if err != nil {
//         logger.Printf("error rendering partial: %s", err)
//     }
// }
