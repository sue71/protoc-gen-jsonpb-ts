/* GENERATED FROM example/example.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as example_dependency from "../example/dependency_pb";

export namespace api {
  export type HTTPMethod = "get" | "delete" | "put" | "post" | "patch";

  export interface APIRequest<Request, Response> {
    path: string;
    method: HTTPMethod;
    response: Response;
    request: Request;
  }

  export namespace API {
    export class HasDependency
      implements
        APIRequest<example_dependency.api.DependencyMessage, Response> {
      path = "/v1/pets";
      method: HTTPMethod = "post";
      response: Response;
      constructor(public request: example_dependency.api.DependencyMessage) {}
    }
    export class Method implements APIRequest<Request, Response> {
      path = "/v1/pets";
      method: HTTPMethod = "post";
      response: Response;
      constructor(public request: Request) {}
    }
  }

  export interface Message {
    value?: string;
    time?: string;
    items?: string[];
    dep?: example_dependency.api.DependencyMessage;
    status?: Enum;
  }

  export interface Request {}

  export interface Response {
    message?: Message[];
    nested?: Response.Nested;
  }

  export namespace Response {
    export interface Nested {
      value?: string;
    }
  }

  export enum Enum {
    VALUE_1 = "VALUE_1",
    VALUE_2 = "VALUE_2"
  }
}
