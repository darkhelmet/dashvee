#!/usr/bin/env bash
set -e
set -x

tag=$1
docker build -t dashvee:$tag .
docker tag dashvee:$tag dashvee:latest
docker restart $(docker ps | grep dashvee | cut -f1 -d' ')
