/* GENERATED FROM example/basic/service/dependency.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as example_basic_shared from "../../../example/basic/shared_pb";

export namespace api {
  export interface DependencyMessage {
    value?: string;
    shared?: example_basic_shared.api.Shared;
  }
}
