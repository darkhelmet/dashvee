#!/usr/bin/env bash
set -e
set -x

ruby -r erb -e "print ERB.new(File.read('Dockerfile.erb')).result" > Dockerfile
scp -q Dockerfile dashvee:Dockerfile
scp -q rebuild.sh dashvee:rebuild.sh
ssh dashvee "./rebuild.sh $(git rev-parse --short HEAD)"
