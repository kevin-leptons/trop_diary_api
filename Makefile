all: dist-deb

clean:
	if [ -d dest ]; then rm -rf dest; fi
	if [ -d dist ]; then rm -rf dist; fi

dist-deb:
	./dist_deb.sh

.PHONY: all clean dist-deb
