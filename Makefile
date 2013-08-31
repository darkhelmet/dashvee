PKG=github.com/darkhelmet/dashvee
DIR=/tmp/dashvee
test:
	revel test $(PKG)

run:
	revel run $(PKG)

build:
	revel build $(PKG) $(DIR)

package:
	revel package $(PKG) $(DIR)
