import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {createApolloClient} from 'vue-cli-plugin-apollo/graphql-client';
Vue.use(VueApollo);
const AUTH_TOKEN = 'apollo-token';
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || 'http:
const defaultOptions = {
  httpEndpoint,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
};
export function createProvider(options = {}) {
  const {apolloClient, wsClient} = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {},
    },
  });
  return apolloProvider;
}
