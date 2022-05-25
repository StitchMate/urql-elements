import { DocumentNode } from "graphql";
import { Client } from "@urql/core";
export declare function useMutation(mutation: DocumentNode | string, config?: Object, externalClient?: Client): {
    loading: boolean;
    called: boolean;
    error: any;
    data: any;
    mutate: Function;
    reset: () => void;
};
