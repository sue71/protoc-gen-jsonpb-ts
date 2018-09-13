#!/bin/sh
npm run build
protoc --plugin=./bin/protoc-gen-jsonpb-ts \
	--jsonpb-ts_out=. \
	-I . -I ./submodules/googleapis \
	./example/basic/service/*.proto