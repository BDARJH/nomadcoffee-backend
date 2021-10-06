import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name }) => {
      return await client.category.findUnique({ where: { name } });
    },
  },
};
