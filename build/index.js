"use strict";
// require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const account_1 = __importDefault(require("./datasources/account"));
const session_1 = __importDefault(require("./datasources/session"));
// const internalEngineDemo = require('./engine-demo');
// set up any dataSources our resolvers need
const dataSources = () => ({
    accountAPI: new account_1.default(),
    sessionAPI: new session_1.default()
});
// Set up Apollo Server
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    dataSources,
    introspection: true,
    playground: true
});
// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
    server
        .listen({ port: process.env.PORT || 4000 })
        .then(({ url }) => {
        console.log(`🚀 app running at ${url}`);
    });
}
// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources,
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    ApolloServer: apollo_server_1.ApolloServer,
    AccountAPI: account_1.default,
    server,
};
