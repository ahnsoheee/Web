const apolloServer = new ApolloServer({
  schemaDirectives: {
     auth: AuthDirective
  }
})