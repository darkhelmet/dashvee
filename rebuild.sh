#!/usr/bin/env bash
set -e

docker build -t dashvee .
docker restart $(docker ps | grep dashvee | cut -f1 -d' ')
