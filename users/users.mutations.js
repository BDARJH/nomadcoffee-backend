import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          username,
          error: "This username/email is already taken.",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          password: hashPassword,
          avatarURL,
          githubUsername,
        },
      });
      return {
        ok: true,
        username,
      };
    },
  },
};
