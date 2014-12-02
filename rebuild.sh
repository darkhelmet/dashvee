#!/usr/bin/env bash
set -e

docker build -t dashvee .
id=ssh dashvee "docker ps | grep dashvee | cut -f1 -d' '"
docker restart $(id)
