const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require('prisma-binding');
const Query =require('../resolvers/Query')
const Mutation =require('../resolvers/Mutation');
const AuthPayload =require('../resolvers/AuthPayload');
var cors = require('cors');

const resolvers = {
 Query,
 Mutation,
 AuthPayload
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint:
        "https://us1.prisma.sh/augusto-romero-ea94f2/firstGRAPHQLservice/hackerNews",
      secret: "myfirstGARgraphqlAPI",
      debug: true
    })
  })
});

const options = {
  cors:cors()
}

server.start((options) => {
  console.log("El servidor esta corriendo en localhost:4000");
});
