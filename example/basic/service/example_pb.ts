/* GENERATED FROM example/basic/service/example.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as example_basic_service_dependency from "../../../example/basic/service/dependency_pb";
import * as example_basic_shared from "../../../example/basic/shared_pb";

export namespace api {
  export type HTTPMethod = "get" | "delete" | "put" | "post" | "patch";

  export interface APIRequest<Request, Response> {
    path: string;
    method: HTTPMethod;
    response: Response;
    request: Request;
  }

  export namespace API {
    export class WellKnown implements APIRequest<{}, string> {
      path = "/v1/wellknown";
      method: HTTPMethod = "post";
      response: string;
      constructor(public request: {}) {}
    }
    export class HasDependency
      implements
        APIRequest<
          example_basic_service_dependency.api.DependencyMessage,
          Response
        > {
      path = "/v1/dependency";
      method: HTTPMethod = "post";
      response: Response;
      constructor(
        public request: example_basic_service_dependency.api.DependencyMessage
      ) {}
    }
    export class Method implements APIRequest<Request, Response> {
      path = "/v1/method";
      method: HTTPMethod = "post";
      response: Response;
      constructor(public request: Request) {}
    }
  }

  export interface Message {
    value?: string;
    time?: string;
    empty?: {};
    duration?: string;
    anyValue?: any;
    fieldMask?: string;
    struct?: Record<string, any>;
    strValue?: string;
    bytesValue?: string;
    int32Value?: number;
    uint32Value?: number;
    int64Value?: string;
    uint64Value?: string;
    floatValue?: number;
    doubleValue?: number;
    boolValue?: boolean;
    items?: string[];
    dep?: example_basic_service_dependency.api.DependencyMessage;
    shared?: example_basic_shared.api.Shared;
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
