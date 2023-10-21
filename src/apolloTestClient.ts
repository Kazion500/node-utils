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

export const createGraphqlTestClient = <Context extends BaseContext, T>(
  schema: any
) => {
  const server = new ApolloServer<Context>({
    schema,
  });

  const query = async (
    query: string,
    variables?: any,
    contextValue?: Context
  ) => {
    return (await server.executeOperation(
      { query: `query ${query}`, variables },
      { contextValue }
    )) as QueryResult<T>;
  };

  const mutate = async (
    mutation: string,
    variables?: any,
    contextValue?: Context
  ) => {
    return (await server.executeOperation(
      { query: `mutation ${mutation}`, variables },
      { contextValue }
    )) as QueryResult<T>;
  };

  return { query, mutate };
};
