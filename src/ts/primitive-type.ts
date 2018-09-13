import { FieldSchema } from "../types";
import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";

export function primitiveType(
  field: FieldDescriptorProto.AsObject
): FieldSchema {
  const type = field.type;
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return {
        type: "number",
        format: "double"
      };
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return {
        type: "number",
        format: "float"
      };
    // 64bit integer types are marshaled as string in the default JSONPb marshaler.
    // TODO(sue): enable to select number or string
    case FieldDescriptorProto.Type.TYPE_INT64:
      return {
        type: "string",
        format: "int64"
      };
    case FieldDescriptorProto.Type.TYPE_UINT64:
      return {
        type: "string",
        format: "uint64"
      };
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return {
        type: "string",
        format: "int64"
      };
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      return {
        type: "string",
        format: "int64"
      };
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return {
        type: "string",
        format: "int64"
      };
    case FieldDescriptorProto.Type.TYPE_INT32:
      return {
        type: "number",
        format: "int32"
      };
    case FieldDescriptorProto.Type.TYPE_UINT32:
      return {
        type: "number",
        format: "int32"
      };
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return {
        type: "number",
        format: "int32"
      };
    case FieldDescriptorProto.Type.TYPE_FIXED32:
      return {
        type: "number",
        format: "int32"
      };
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return {
        type: "number",
        format: "int32"
      };
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return {
        type: "boolean",
        format: "boolean"
      };
    case FieldDescriptorProto.Type.TYPE_STRING:
      return {
        type: "string",
        format: "string"
      };
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return {
        type: "string",
        format: "byte"
      };
    default:
      return {
        type: "any"
      };
  }
}
