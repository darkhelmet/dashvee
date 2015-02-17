#!/usr/bin/env bash
set -e
set -x

git push
ruby -r erb -e "print ERB.new(File.read('Dockerfile.erb')).result" > Dockerfile
sha=$(git rev-parse --short HEAD)
docker build -t darkhelmetlive/dashvee:latest .
docker tag -f darkhelmetlive/dashvee:latest darkhelmetlive/dashvee:${sha}
docker push darkhelmetlive/dashvee:latest
docker push darkhelmetlive/dashvee:${sha}
