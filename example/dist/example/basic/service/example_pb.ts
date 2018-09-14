/* GENERATED FROM example/basic/service/example.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as example_basic_service_dependency from "../../../example/basic/service/dependency_pb";
import * as example_basic_shared from "../../../example/basic/shared_pb";

export namespace example.basic.service {
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
          example_basic_service_dependency.example.basic.service.DependencyMessage,
          Response
        > {
      path = "/v1/dependency";
      method: HTTPMethod = "post";
      response: Response;
      constructor(
        public request: example_basic_service_dependency.example.basic.service.DependencyMessage
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
    dep?: example_basic_service_dependency.example.basic.service.DependencyMessage;
    shared?: example_basic_shared.example.basic.Shared;
    status?: Enum;
    double?: number;
    float?: number;
    int64?: string;
    uint64?: string;
    sint64?: string;
    fixed64?: string;
    sfixed64?: string;
    int32?: number;
    uint32?: number;
    sint32?: number;
    fixed32?: number;
    sfixed32?: number;
    string?: string;
    byte?: string;
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
