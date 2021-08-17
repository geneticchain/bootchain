#------------------------------------------------------------------------------
# Boo Chain - Art
#------------------------------------------------------------------------------

.DEFAULT_GOAL := default

#------------------------------------------------------------------------------
# setup
#------------------------------------------------------------------------------

.PHONY: npm-setup

npm-setup:
	npm install

#------------------------------------------------------------------------------
# build
#------------------------------------------------------------------------------

.PHONY: default all clean dist

default: all

app/dist/art.js: src/traits.js src/art.js
	gulp js:art

app/dist/metadata.js: src/traits.js src/metadata.js
	gulp js:metadata

app/dist/art-min.js: app/dist/art.js
	gulp js:min

all: app/dist/metadata.js app/dist/art-min.js
	:

clean:
	rm -rf app/dist/*

#------------------------------------------------------------------------------
# misc
#------------------------------------------------------------------------------

watch:
	gulp watch
