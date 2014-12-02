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
	scp -q Dockerfile dashvee:Dockerfile
	scp -q rebuild.sh dashvee:rebuild.sh
	ssh dashvee ./rebuild.sh $(git rev-parse --short HEAD)

package:
	revel package $(PKG) $(DIR)

.PHONY: assets Dockerfile
