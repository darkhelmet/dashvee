PKG=github.com/darkhelmet/dashvee
DIR=/tmp/dashvee

test:
	revel test $(PKG)

assets:
	COMPRESS=true ruby package_assets.rb

run:
	revel run $(PKG)

Dockerfile:
	ruby -r erb -e "print ERB.new(File.read('Dockerfile.erb')).result" > Dockerfile

deploy: Dockerfile
	scp Dockerfile dashvee:Dockerfile
	ssh dashvee docker build -t dashvee .
	ssh dashvee docker restart $(ssh dashvee "docker ps | grep dashvee | cut -f1 -d' '")

package:
	revel package $(PKG) $(DIR)

.PHONY: assets Dockerfile
