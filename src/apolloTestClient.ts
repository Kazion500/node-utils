import { ApolloServer, BaseContext } from "@apollo/server";
import { GraphQLFormattedError } from "graphql";

interface BodyResponse<Results = any> {
  kind: "single";
  singleResult: {
    data: Results;
    errors: readonly GraphQLFormattedError[];
  };
}

interface QueryResult<Results = any> {
  body: BodyResponse<Results>;
}

export const testClient = async <Context extends BaseContext>(schema: any) => {
  const server = new ApolloServer<Context>({
    schema,
  });

  const query = async <Response>(
    query: string,
    variables?: any,
    contextValue?: Context
  ) => {
    return (await server.executeOperation(
      { query: `query ${query}`, variables },
      { contextValue }
    )) as QueryResult<Response>;
  };

  const mutate = async <Response>(
    mutation: string,
    variables?: any,
    contextValue?: Context
  ) => {
    return (await server.executeOperation(
      { query: `mutation ${mutation}`, variables },
      { contextValue }
    )) as QueryResult<Response>;
  };

  return { query, mutate };
};
