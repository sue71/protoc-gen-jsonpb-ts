import { FieldDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
import {
  FileDescriptorProto,
  DescriptorProto,
  EnumDescriptorProto
} from "google-protobuf/google/protobuf/descriptor_pb";
import { toArray } from "./utils";

interface Definition {
  typeName: string;
  filename: string;
  packageName: string;
}

export class ExportMap {
  definitionMap: Record<string, Definition> = {};
  protoMap: Record<string, FileDescriptorProto> = {};
  fieldMap: Record<string, FieldDescriptorProto[]> = {};

  public getDefinition(typeName: string): Definition {
    return this.definitionMap[typeName];
  }

  public getProto(filename: string): FileDescriptorProto {
    return this.protoMap[filename];
  }

  public addProto(proto: FileDescriptorProto) {
    this.protoMap[proto.getName()] = proto;
    proto.getEnumTypeList().forEach(enumType => {
      this.readEnum(enumType, proto, proto.getPackage());
    });
    proto.getMessageTypeList().forEach(message => {
      this.readMessage(message, proto, proto.getPackage());
    });
  }

  public hasDependency(filename: string, dependency: string): boolean {
    return this.getDependencies(filename, dependency).length > 0;
  }

  public getDependencies(filename: string, dependency: string): Definition[] {
    const fields = this.fieldMap[filename];
    if (!fields) {
      return [];
    }
    const fieldTypeNames = fields.map(field => field.getTypeName().slice(1));
    return toArray(this.definitionMap).filter(
      definition =>
        definition.filename === dependency &&
        fieldTypeNames.indexOf(definition.typeName) !== -1
    );
  }

  private readMessage(
    message: DescriptorProto,
    proto: FileDescriptorProto,
    scope: string
  ) {
    const filename = proto.getName();
    const packageName = proto.getPackage();
    const prefix = scope ? scope + "." : "";
    const name = `${prefix}${message.getName()}`;
    if (this.fieldMap[filename] === undefined) {
      this.fieldMap[filename] = [];
    }
    this.definitionMap[name] = {
      typeName: name,
      filename,
      packageName
    };
    message.getFieldList().forEach(field => {
      this.fieldMap[filename].push(field);
    });
    message.getEnumTypeList().forEach(enumType => {
      this.readEnum(enumType, proto, name);
    });
    message.getNestedTypeList().forEach(message => {
      this.readMessage(message, proto, name);
    });
  }

  private readEnum(
    enumType: EnumDescriptorProto,
    proto: FileDescriptorProto,
    scope: string
  ) {
    const filename = proto.getName();
    const packageName = proto.getPackage();
    const prefix = scope ? scope + "." : "";
    const name = `${prefix}${enumType.getName()}`;
    this.definitionMap[name] = {
      typeName: name,
      filename,
      packageName
    };
  }
}
