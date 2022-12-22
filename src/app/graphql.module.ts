import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';

// const uri = 'http://localhost:3001/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({uri: '/graphql'}),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
        let uriPath;
        if (environment.production) {
          uriPath = { uri: '/graphql' };
        } else {
          uriPath = { uri: 'http://localhost:3001/graphql' };
        }
        const http = httpLink.create(uriPath);

        // Create a WebSocket link: 1
        const ws = new WebSocketLink({
          uri: `ws://localhost:3001/graphql`,
          options: {
            reconnect: true,
          },
        });
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'Authorization',
              `Bearer ${localStorage.getItem('id_token') || null}`
            ),
          });
          return forward(operation);
        });

        const link = middleware.concat(http).split(
          // split based on operation type
          ({ query }) => {
            const data = getMainDefinition(query);
            return (
              data.kind === 'OperationDefinition' &&
              data.operation === 'subscription'
            );
          },
          ws,
          http
        );

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
