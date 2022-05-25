import { Client } from "@urql/core";
import { DocumentNode } from "graphql";
declare const makeQuery: (client: Client) => (query: DocumentNode | string, variables?: Object) => Promise<import("@urql/core").OperationResult<any, Object>>;
declare const makeMutation: (client: Client) => (query: DocumentNode | string, variables?: Object) => Promise<import("@urql/core").OperationResult<any, Object>>;
export { makeQuery, makeMutation };
