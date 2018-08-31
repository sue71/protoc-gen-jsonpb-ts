# protoc-gen-jsonpb-ts
This is protoc plugin for generating TypeScript definitions.

## Feature

- Generate TypeScript definitions according to the spec. (https://developers.google.com/protocol-buffers/docs/proto3#json)
- Generate request class from the method definition if custom options are defined (https://cloud.google.com/service-infrastructure/docs/service-management/reference/rpc/google.api#http)

## Installation

First you need to install ProtocolBuffers v3.0.0 or later.
Then, install this plugin via `npm`.

```
npm install protoc-gen-jsonpb-ts --save-dev
```

## Usage

This plugin uses [custom options](https://cloud.google.com/service-infrastructure/docs/service-management/reference/rpc/google.api#http). You should define these options in proto.

Example
```protobuf
rpc Method(Request) returns (Response) {
  option (google.api.http) = {
    post : "/v1/method"
    body : "*"
  };
}
```

Then, generate definitions using `protoc` command.

```sh
protoc \
  -I submodules/grpc-ecosystem/grpc-gateway/third_party/googleapis \
  --plugin=./node_modules/.bin/protoc-gen-jsonpb-ts \
  --jsonpb-ts_out=. \
  path/to/your_service.proto
```

## Configuration

This plugin looks for a config file named `protoc-gen-tsconfig.json` and loads settings from it. 

```
{
  ignorePackage: boolean; // defalut false
  jsonFormat: boolean;    // default true
}
```

Also supporting cli options.

```
protoc --jsonpb-ts_out=ignorePackage=true:. 
```

### Options

- `ignorePackage` 

By default, use `package` as a `namespace`. If true, `namespace` will not be made.

- `jsonFormat`

By default, the well-known type is changed according to [this specification](https://developers.google.com/protocol-buffers/docs/proto3#json). If true, you can use all types as it is.

## Examples

Some examples are available under [example directory](https://github.com/sue71/protoc-gen-jsonpb-ts/blob/master/example)

## License

[MIT](https://github.com/sue71/protoc-gen-jsonpb-ts/blob/master/LICENSE)