PKG=github.com/darkhelmet/dashvee
DIR=/tmp/dashvee

test:
	revel test $(PKG)

assets:
	COMPRESS=true ruby package_assets.rb

run:
	revel run $(PKG)

.PHONY: assets
