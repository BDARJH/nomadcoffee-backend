import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    username: String!
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
