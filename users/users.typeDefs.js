import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
    seeProfile(username: String!): User
  }
  type CreateAccountResult {
    ok: Boolean!
    username: String!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String
      name: String!
      location: String
      password: String!
      avatarURL: String
      githubUsername: String!
    ): CreateAccountResult!
  }
`;
