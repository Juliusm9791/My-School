const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const path = require("path");
require("dotenv").config();

const { typeDefs, resolvers } = require("./server/schemas");
const { authMiddleware } = require("./server/utils/auth");
const db = require("./server/config/connection");

(async function () {
  const PORT = process.env.PORT || 3001;
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "./images")));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./dist")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
  });

  // httpServer.listen(PORT, () => {console.log("http server listen", PORT)})
  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        PORT === 3001 &&
          `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
})();
