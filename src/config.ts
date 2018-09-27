import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const CONFIG_FILENAME = "protoc-gen-tsconfig.json";

type FailureReason = "invalidOption" | "invalidValue";
interface ValidationResult {
  valid: boolean;
  field?: string;
  value?: any;
  reason?: FailureReason;
}

interface Options {
  config: string;
  jsonFormat: boolean;
  ignorePackage: boolean;
  enumFormat: "stringLiteral" | "enum";
}

namespace Options {
  export function enumerate(): (keyof Options)[] {
    return ["config", "jsonFormat", "ignorePackage", "enumFormat"];
  }
  export function enumerateEnumFormat(): Options["enumFormat"][] {
    return ["stringLiteral", "enum"];
  }
}

export class Config {
  static defaultOptions: Options = {
    jsonFormat: true,
    config: path.join(process.cwd(), CONFIG_FILENAME),
    ignorePackage: false,
    enumFormat: "enum"
  };

  static initWithCLIOptions(options: string): Config {
    return this.initWithOptions(parseCLIOptions(options));
  }

  static initWithOptions(options: Partial<Options>): Config {
    const jsonFormat =
      options.jsonFormat !== undefined
        ? options.jsonFormat
        : this.defaultOptions.jsonFormat;
    const ignorePackage =
      options.ignorePackage !== undefined
        ? options.ignorePackage
        : this.defaultOptions.ignorePackage;
    const enumFormat = options.enumFormat || this.defaultOptions.enumFormat;
    const config = options.config || this.defaultOptions.config;

    return this.initWithConfig({
      jsonFormat,
      config,
      ignorePackage,
      enumFormat
    });
  }

  static initWithConfig(options: Options) {
    const config = Object.assign({}, options, loadConfig(options.config));

    const validation = validate(config as any);
    if (!validation.valid) {
      switch (validation.reason) {
        case "invalidOption":
          throw new Error(`${validation.field} is not valid option.`);
        case "invalidValue":
          throw new Error(
            `The value of ${validation.field} is invalid. value: ${
              validation.value
            }`
          );
      }
    }

    return new this(config);
  }

  constructor(public options: Options) {}

  get asObject(): Options {
    return this.options;
  }
}

export namespace Config {
  export type AsObject = Options;
}

function loadConfig(config: string): Partial<Options> {
  try {
    const configFile = fs.readFileSync(config, { encoding: "utf-8" });
    const options = JSON.parse(configFile);
    return options;
  } catch (error) {
    return {};
  }
}

function parseCLIOptions(options: string): Partial<Options> {
  return options.split(",").reduce((res, v) => {
    const split = v.split("=");
    return Object.assign(res, { [split[0]]: split[1] });
  }, {}) as Partial<Options>;
}

function validate(config: Options): ValidationResult {
  const keys = Options.enumerate() as string[];
  const invalidOption = Object.keys(config).find(
    key => keys.indexOf(key) === -1
  );
  if (invalidOption) {
    return { valid: false, field: invalidOption, reason: "invalidOption" };
  }
  if (
    config.enumFormat &&
    Options.enumerateEnumFormat().indexOf(config.enumFormat) === -1
  ) {
    return {
      valid: false,
      field: "enumFormat",
      value: config.enumFormat,
      reason: "invalidValue"
    };
  }
  return { valid: true };
}
