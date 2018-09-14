#!/bin/sh
npm run build
protoc --plugin=./bin/protoc-gen-jsonpb-ts \
	--jsonpb-ts_out=./example/dist \
	-I . \
	-I ./submodules/googleapis \
	./example/basic/*.proto \
	./example/basic/service/*.proto 