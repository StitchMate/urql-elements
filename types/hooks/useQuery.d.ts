import { DocumentNode } from "graphql";
import { Client } from "@urql/core";
export declare function useQuery(query: DocumentNode | string, config?: Object, externalClient?: Client): {
    loading: boolean;
    error: any;
    data: any;
    refetch: Function;
};
