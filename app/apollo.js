import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('/graphql');

export const client = new ApolloClient({
  networkInterface,
});
