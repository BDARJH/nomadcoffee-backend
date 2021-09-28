import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    email: String!
    name: String!
    age: Int
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
    user(id: String!): User
  }
  type Mutation {
    createUser(id: String!, email: String!, name: String!, age: Int): User
    deleteUser(id: String!): User
    updateUser(id: String!, email: String!): User
  }
`;
