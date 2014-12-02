#!/usr/bin/env bash
set -e
set -x

tag=$1
docker build -t dashvee:latest .
docker tag dashvee:latest dashvee:$tag

id=$(docker ps | grep dashvee | cut -f1 -d' ')
docker stop $id
docker run -d -p 80:80 dashvee:latest
docker rm $id
