import { FieldSchema, DependencySchema, HTTPRule } from "./types";
import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";

export abstract class Helper {
  isRepeated(field: FieldDescriptorProto.AsObject) {
    return FieldDescriptorProto.Label.LABEL_REPEATED === field.label;
  }
  isRequired(field: FieldDescriptorProto.AsObject) {
    return FieldDescriptorProto.Label.LABEL_REQUIRED === field.label;
  }

  abstract mapImports(dependencies: string[], filename: string): DependencySchema[];
  abstract mapHTTPOptions(http: HTTPRule);
  abstract mapFieldName(name: string): string;
  abstract mapFieldType(
    proto: FieldDescriptorProto.AsObject,
    filename: string
  ): FieldSchema;
  abstract mapFieldTypeName(name: string, filename: string): FieldSchema;
}
