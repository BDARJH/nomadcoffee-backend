import { gql } from "apollo-server";

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int
      name: String
      photos: [Upload]
      categories: [String]
    ): EditCoffeeShopResult!
  }
`;
