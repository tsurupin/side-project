import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = '/graphql';

export default const client = new ApolloClient({
  link: createHttpLink({ uri }),
  cache: new InMemoryCache(),
});
