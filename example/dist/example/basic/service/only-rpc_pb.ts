/* GENERATED FROM example/basic/service/only-rpc.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import { APIRequest, HTTPMethod } from "protoc-gen-jsonpb-ts";

import * as example_basic_dependency_dependency from "../../../example/basic/dependency/dependency_pb";

export namespace OnlyRPC {
  export class Method
    implements
      APIRequest<
        example_basic_dependency_dependency.example.basic.dependency.DependencyMessage,
        example_basic_dependency_dependency.example.basic.dependency.DependencyMessage
      > {
    _response?: example_basic_dependency_dependency.example.basic.dependency.DependencyMessage;
    path = "/v1/method";
    method: HTTPMethod = "post";
    constructor(
      public parameter: example_basic_dependency_dependency.example.basic.dependency.DependencyMessage
    ) {}
  }
}
