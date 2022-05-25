import { c, Props, useEffect } from "atomico";
import { useChannel } from "@atomico/hooks/use-channel";
import { Client, createClient } from "@urql/core";

function urqlClient({ uri }: Props<typeof urqlClient.props>) {
  const [, setClient] = useChannel<Client>("urql");

  useEffect(() => {
    let client = createClient({
      url: uri,
    });
    setClient(client);
  });

  return (
    <host shadowDom>
      <slot />
    </host>
  );
}

urqlClient.props = {
  uri: String,
};

customElements.define("urql-client", c(urqlClient));
