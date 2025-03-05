deps:
	npm install puppeteer fs-extra

build:
	nohup python3 -m http.server & node build.js && pkill python3

full-build:
	make deps && make build

.PHONY: install build