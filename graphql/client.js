import {ApolloClient, InMemoryCache} from '@apollo/client';

export default new ApolloClient({
  uri: 'https://graphql.anilist.co/query',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
        
          Page: {
            keyArgs: [],

            merge(existing, incoming) {
              const media = existing ? [...existing.media] : []
                 return {
                    media: [...media, ...incoming.media],
                    pageInfo: incoming.pageInfo
                 }
            },
          }
        }
      }
    }
  }),
});
