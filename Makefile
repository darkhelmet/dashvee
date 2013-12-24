PKG=github.com/darkhelmet/dashvee
DIR=/tmp/dashvee

test:
	revel test $(PKG)

assets:
	COMPRESS=true ruby package_assets.rb

run:
	revel run $(PKG)

build:
	revel build $(PKG) $(DIR)

package:
	revel package $(PKG) $(DIR)

.PHONY: assets
