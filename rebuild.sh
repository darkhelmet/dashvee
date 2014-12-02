#!/usr/bin/env bash
set -e
set -x

tag=$1
docker build -t dashvee:latest .
docker tag dashvee:latest dashvee:$tag
docker restart $(docker ps | grep dashvee | cut -f1 -d' ')
