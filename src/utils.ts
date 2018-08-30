import { FileDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";
import { wellKnownProto } from "./ts/well-known-proto";

/**
 * enumerate object
 * @param dependency
 */
export function toArray<T>(object: Record<string, T>): T[] {
  return Object.keys(object).map(key => object[key]);
}

/**
 * get dependency filename
 * @param dependency
 */
export function dependencyFilename(dependency: string, filename: string) {
  if (wellKnownProto[dependency]) {
    return wellKnownProto[dependency];
  }
  const path = relativePath(filename);
  return `${path}${dependency.replace(".proto", "_pb")}`;
}

/**
 * get dependency name
 * @param dependency
 */
export function dependencyName(dependency: string) {
  return dependency.replace(/\//g, "_").replace(".proto", "");
}

/**
 * snale_case to camelCase
 * @param str
 */
export function snakeToCamel(str: string): string {
  return str.replace(/(\_\w)/g, function(m) {
    return m[1].toUpperCase();
  });
}

/**
 * Get path to root
 * @param filepath
 */
export function relativePath(filepath: string) {
  const depth = filepath.split("/").length;
  return depth === 1 ? "./" : new Array(depth).join("../");
}

/**
 * lowerCase case to UpperCase
 * @param str
 */
export function uppercaseFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check method for proto
 * @param descriptor
 */
export function isProto2(descriptor: FileDescriptorProto): boolean {
  const syntax = descriptor.getSyntax();
  return syntax === "" || syntax === "proto2";
}

/**
 * Read input
 * @param stream
 */
export function read(stream = process.stdin): Promise<Buffer> {
  const response: Buffer[] = [];
  let size = 0;

  return new Promise((resolve, reject) => {
    stream.on("readable", function() {
      let chunk;
      while ((chunk = stream.read())) {
        if (!(chunk instanceof Buffer))
          throw new Error("Did not receive buffer");
        response.push(chunk);
        size += chunk.length;
      }
    });
    stream.on("error", error => {
      reject(error);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(response, size));
    });
  });
}
