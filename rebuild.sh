#!/usr/bin/env bash
set -e
set -x

docker build -t dashvee:$1 .
# docker restart $(docker ps | grep dashvee | cut -f1 -d' ')
