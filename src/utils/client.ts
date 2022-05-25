import { Client } from "@urql/core";
import { DocumentNode } from "graphql";

const makeQuery =
  (client: Client) =>
  (query: DocumentNode | string, variables: Object = {}) =>
    client.query(query, variables).toPromise();

const makeMutation =
  (client: Client) =>
  (query: DocumentNode | string, variables: Object = {}) =>
    client.mutation(query, variables).toPromise();

export { makeQuery, makeMutation };
