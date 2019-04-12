#!/bin/sh
WORKINGDIR=$(pwd)

npm run build
cd $WORKINGDIR/example
npm i
cd $WORKINGDIR
protoc --plugin=./bin/protoc-gen-jsonpb-ts \
	--jsonpb-ts_out=./example/dist \
	-I . \
	-I ./submodules/googleapis \
	./example/no-package/*.proto \
	./example/basic/*.proto \
	./example/basic/dependency/*.proto \
	./example/basic/service/*.proto
./node_modules/.bin/tsc -p ./example/tsconfig.json