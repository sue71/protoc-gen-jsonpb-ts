import {
  FileDescriptorProto,
  DescriptorProto,
  EnumDescriptorProto
} from "google-protobuf/google/protobuf/descriptor_pb";

interface Field {
  filename: string;
  packageName: string;
}

export class ExportMap {
  fieldMap: Record<string, Field> = {};
  protoMap: Record<string, FileDescriptorProto> = {};

  public getField(typeName: string): Field {
    return this.fieldMap[typeName];
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

  private readMessage(
    message: DescriptorProto,
    proto: FileDescriptorProto,
    scope: string
  ) {
    const filename = proto.getName();
    const packageName = proto.getPackage();
    const prefix = scope ? scope + "." : "";
    const name = `${prefix}${message.getName()}`;
    this.fieldMap[name] = {
      filename,
      packageName
    };
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
    this.fieldMap[name] = {
      filename,
      packageName
    };
  }
}
