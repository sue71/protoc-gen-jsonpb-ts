import { read } from "./utils";
import { Config } from "./config";
import {
  CodeGeneratorRequest,
  CodeGeneratorResponse
} from "google-protobuf/google/protobuf/compiler/plugin_pb";
import * as process from "process";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { TSHelper } from "./ts/helper";
import { ExportMap } from "./export-map";
import * as prettier from "prettier";

require("../vendor/google/api/annotations_pb");

read()
  .then(buffer => {
    const input = new Uint8Array(buffer.length);
    input.set(buffer);

    const request = CodeGeneratorRequest.deserializeBinary(input);
    const response = new CodeGeneratorResponse();
    const config = Config.initWithCLIOptions(request.getParameter());
    const map = new ExportMap();
    const helper = new TSHelper(config, map);

    request.getProtoFileList().forEach(descriptor => {
      map.addProto(descriptor);
    });

    request.getFileToGenerateList().forEach(filename => {
      const file = new CodeGeneratorResponse.File();
      const templatePath = path.resolve(__dirname, "../templates/ts/proto.ejs");
      const template = fs.readFileSync(templatePath, {
        encoding: "utf-8"
      });
      const output = ejs.render(
        template,
        {
          proto: map.getProto(filename).toObject(),
          helper,
          config: config.asObject
        },
        {
          root: path.resolve(__dirname, "../templates")
        }
      );
      const content = prettier.format(output, { parser: "typescript" });
      file.setName(filename.replace(".proto", "_pb.ts"));
      file.setContent(content);
      response.addFile(file);
    });

    process.stdout.write(Buffer.from(response.serializeBinary()));
  })
  .catch(error => {
    console.error(error);
    process.exit(2);
  });
