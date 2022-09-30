const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
require("dotenv").config();

const { typeDefs, resolvers } = require("./server/schemas");
const { authMiddleware } = require("./server/utils/auth");
const db = require("./server/config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

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

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(PORT === 3001 && `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
