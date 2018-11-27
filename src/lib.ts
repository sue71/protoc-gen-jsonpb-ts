export type HTTPMethod =
  | "get"
  | "post"
  | "put"
  | "head"
  | "delete"
  | "patch"
  | "trace"
  | "options"
  | "connect";

export interface APIRequest<Request, Response> {
  _response?: Response;
  parameter?: Request;
  path: string;
  method: HTTPMethod;
}
