package webutil

import (
	"log"
	"net/http"
	"strings"
	"time"
)

type LoggerHandler struct {
	H      http.Handler
	Logger *log.Logger
}

func (lh LoggerHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	lh.Logger.Printf("%s %s\n", r.Method, r.URL)
	lh.H.ServeHTTP(w, r)
}

type KeyLogRecord struct {
	http.ResponseWriter

	time                         time.Time
	method, path, host, ip, port string
	status                       int
	bytes                        int64
	elapsed                      time.Duration
}

func (r *KeyLogRecord) Log(l *log.Logger) {
	l.Printf("method=%s path=%s host=%s port=%s ip=%s time=%s status=%d bytes=%d",
		r.method, r.path, r.host, r.port, r.ip, r.elapsed, r.status, r.bytes)
}

func (r *KeyLogRecord) Write(p []byte) (int, error) {
	written, err := r.ResponseWriter.Write(p)
	r.bytes += int64(written)
	return written, err
}

func (r *KeyLogRecord) WriteHeader(status int) {
	r.status = status
	r.ResponseWriter.WriteHeader(status)
}

type KeyLoggerHandler struct {
	H      http.Handler
	Logger *log.Logger
}

func (klh KeyLoggerHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ip := r.RemoteAddr
	if colon := strings.LastIndex(ip, ":"); colon != -1 {
		ip = ip[:colon]
	}

	host := r.Host
	port := "80"
	if colon := strings.LastIndex(host, ":"); colon != -1 {
		port = host[colon+1:]
		host = host[:colon]
	}

	record := &KeyLogRecord{
		ResponseWriter: w,
		method:         r.Method,
		path:           r.RequestURI,
		host:           host,
		port:           port,
		ip:             ip,
	}

	startTime := time.Now()
	klh.H.ServeHTTP(record, r)
	finishTime := time.Now()

	record.elapsed = finishTime.Sub(startTime)
	record.Log(klh.Logger)
}
