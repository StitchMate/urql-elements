import { gql } from "graphql-tag";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "atomico/core";
import { useChannel } from "@atomico/hooks/use-channel";
import { Client } from "@urql/core";
import { makeQuery } from "../utils/client";


export function useQuery(
  query: DocumentNode | string,
  config: Object = {},
  externalClient?: Client
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [refetch, setRefetch] = useState<Function>(undefined);
  let [client] = useChannel<Client>("urql");

  const performQuery = (client) => {
    let fetch = makeQuery(client);

    let refetch = (variables = {}) => {
      setLoading(true);
      fetch(query, variables)
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
          if (res.error) {
            setError(res.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    setRefetch(() => refetch);

    fetch(query, config["variables"] || {})
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
        if (res.error) {
          setError(res.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (client && !externalClient) {
      performQuery(client);
    }
  }, [client]);

  useEffect(() => {
    if (externalClient) {
        performQuery(externalClient);
    }
  }, [])

  return {
    loading,
    error,
    data,
    refetch,
  };
}
