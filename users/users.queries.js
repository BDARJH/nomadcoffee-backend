import client from "../client";

export default {
  Query: {
    users: () => client.user.findMany(),
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
