import { gql } from "graphql-tag";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "atomico/core";
import { useChannel } from "@atomico/hooks/use-channel";
import { Client } from "@urql/core";
import { makeMutation } from "../utils/client";

export function useMutation(
  mutation: DocumentNode | string,
  config: Object = {},
  externalClient?: Client
) {
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [mutate, setMutate] = useState<Function>(undefined);
  let [client] = useChannel<Client>("urql");

  const constructMutate = (client) => {
    let fetch = makeMutation(client);

    let mutate = (variables = {}) => {
      setLoading(true);
      fetch(mutation, variables)
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
          if (res.error) {
            setError(res.error);
          }
          setCalled(true);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setCalled(true);
          setLoading(false);
        });
    };

    setMutate(mutate);
  };

  useEffect(() => {
    if (client && !externalClient) {
      constructMutate(client);
    }
  }, [client]);

  useEffect(() => {
    if (externalClient) {
      constructMutate(externalClient);
    }
  }, []);

  return {
    loading,
    called,
    error,
    data,
    mutate,
    reset: () => {
      setCalled(false);
      setLoading(false);
      setError(undefined);
      setData(undefined);
    },
  };
}
