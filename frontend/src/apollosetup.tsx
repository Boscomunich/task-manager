import { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type Apolloprops = {
    token: string | null
    children: ReactNode
}

export default function ApolloSetup ({ token, children }: Apolloprops) {
    // Create an HTTP link to your GraphQL server
    const httpLink = createHttpLink({
        uri: 'http://localhost:5000/graphql',
    });

    // Create an authentication link to set the Authorization header
    const authLink = setContext((_, { headers }) => {
        // Return the headers to the context so httpLink can read them
        return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        }
        };
    });

    // Create the Apollo Client instance
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};
