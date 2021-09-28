import client from "../client";

export default {
  Mutation: {
    createUser: (_, { id, email, name, age }) =>
      client.user.create({
        data: {
          id,
          email,
          name,
          age,
        },
      }),
    deleteUser: (_, { id }) => client.user.delete({ where: { id } }),
    updateUser: (_, { id, email }) =>
      client.user.update({ where: { id }, data: { email } }),
  },
  Query: {
    users: () => client.user.findMany(),
    user: (_, { id }) => client.user.findUnique({ where: { id } }),
  },
};
