import client from "../../client";

export default {
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
    shops: ({ id }, { lastId }) =>
      client.category.findUnique({ where: { id } }).shops({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
  Query: {
    seeCategories: async (_, { lastId }) =>
      client.category.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
