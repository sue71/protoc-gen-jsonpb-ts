import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const CONFIG_FILENAME = "protoc-gen-tsconfig.json";

interface ValidationResult {
  valid: boolean;
  field?: string;
}

interface Options {
  config: string;
  jsonFormat: boolean;
  ignorePackage: boolean;
}

namespace Options {
  export function enumerate(): (keyof Options)[] {
    return ["config", "jsonFormat", "ignorePackage"];
  }
}

export class Config {
  static defaultOptions: Options = {
    jsonFormat: true,
    config: path.join(process.cwd(), CONFIG_FILENAME),
    ignorePackage: false
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
    const config = options.config || this.defaultOptions.config;
    return this.initWithConfig({
      jsonFormat,
      config,
      ignorePackage
    });
  }

  static initWithConfig(options: Options) {
    const config = loadConfig(options.config);

    const validation = validate(config);
    if (!validation.valid) {
      throw new Error(`${validation.field} is not valid option.`);
    }

    return new this(Object.assign({}, options, config));
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

function validate(config: any): ValidationResult {
  const keys = Options.enumerate() as string[];
  const invalidKey = Object.keys(config).find(key => keys.indexOf(key) === -1);
  if (invalidKey) {
    return { valid: false, field: invalidKey };
  }
  return { valid: true };
}
