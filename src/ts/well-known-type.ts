import { FieldSchema } from "../types";
import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";

/**
 * Well-Known-Type maps
 * @see https://developers.google.com/protocol-buffers/docs/proto3
 */
export const wktMap: Record<string, FieldSchema> = {
  ".google.protobuf.Timestamp": {
    type: "string",
    format: "date-time"
  },
  ".google.protobuf.Duration": {
    type: "string"
  },
  ".google.protobuf.StringValue": {
    type: "string"
  },
  ".google.protobuf.BytesValue": {
    type: "string",
    format: "byte"
  },
  ".google.protobuf.Int32Value": {
    type: "integer",
    format: "int32"
  },
  ".google.protobuf.UInt32Value": {
    type: "integer",
    format: "int64"
  },
  ".google.protobuf.Int64Value": {
    type: "string",
    format: "int64"
  },
  ".google.protobuf.UInt64Value": {
    type: "string",
    format: "uint64"
  },
  ".google.protobuf.FloatValue": {
    type: "number",
    format: "float"
  },
  ".google.protobuf.DoubleValue": {
    type: "number",
    format: "double"
  },
  ".google.protobuf.BoolValue": {
    type: "boolean",
    format: "boolean"
  }
};

export function isWellKnown(field: FieldDescriptorProto.AsObject): boolean {
  return wktMap[field.typeName] !== undefined;
}

export function wellKnownType(field: FieldDescriptorProto.AsObject): FieldSchema {
  return wktMap[field.typeName];
}
