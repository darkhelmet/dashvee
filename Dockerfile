FROM golang:1.5.2

RUN go get github.com/tools/godep
RUN go get github.com/revel/cmd/revel

ADD . /go/src/github.com/darkhelmet/dashvee
WORKDIR /go/src/github.com/darkhelmet/dashvee
RUN rm -rf Godeps/_workspace/bin Godeps/_workspace/pkg

RUN godep go install ./...

ENV PATH   /go/src/github.com/darkhelmet/dashvee/Godeps/_workspace/bin:$PATH
ENV GOPATH /go/src/github.com/darkhelmet/dashvee/Godeps/_workspace:$GOPATH

ENV ASSET_HOST      http://cf.verboselogging.com
ENV CANONICAL_HOST  verboselogging.com
ENV GOMAXPROCS      4
ENV TZ              Canada/Mountain

EXPOSE 80
CMD revel run github.com/darkhelmet/dashvee prod 80
