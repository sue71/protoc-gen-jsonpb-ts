import { FieldSchema } from "../types";

/**
 * Well-Known-Type maps
 * @see https://developers.google.com/protocol-buffers/docs/proto3
 */
export const wktMap: Record<string, FieldSchema> = {
  ".google.protobuf.Timestamp": {
    type: "string",
    format: "date-time"
  },
  ".google.protobuf.Empty": {
    type: "{}"
  },
  ".google.protobuf.Duration": {
    type: "string"
  },
  ".google.protobuf.Any": {
    type: "any"
  },
  ".google.protobuf.FieldMask": {
    type: "string"
  },
  ".google.protobuf.Struct": {
    type: "Record<string, any>"
  },
  ".google.protobuf.StringValue": {
    type: "string"
  },
  ".google.protobuf.BytesValue": {
    type: "string",
    format: "byte"
  },
  ".google.protobuf.Int32Value": {
    type: "number",
    format: "int32"
  },
  ".google.protobuf.UInt32Value": {
    type: "number",
    format: "int32"
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

export function isWellKnown(typeName: string): boolean {
  return wktMap[typeName] !== undefined;
}

export function wellKnownType(typeName: string): FieldSchema {
  return wktMap[typeName];
}
