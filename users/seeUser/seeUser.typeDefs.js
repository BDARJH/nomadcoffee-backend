import { gql } from "apollo-server";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowers(username: String!, lastId: Int): SeeFollowersResult!
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
  }
`;
