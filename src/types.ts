export interface FieldSchema {
  type: string;
  format?: string;
}
export type HTTPMethod = "post" | "put" | "get" | "delete" | "patch";

export interface DependencySchema {
  name: string;
  filename: string;
}

// @see https://cloud.google.com/service-management/reference/rpc/google.api#http
export interface HTTPRule {
  selector: string;
  get: string;
  put: string;
  post: string;
  pb_delete: string;
  patch: string;
  body: "*" | string;
  custom: CustomHTTPPattern;
  additionalBindingsList: HTTPRule[];
}

interface CustomHTTPPattern {
  kind: string;
  path: string;
}
