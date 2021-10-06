import slug from "slug";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        try {
          const existingCoffeeShop = await client.coffeeShop.findFirst({
            where: {
              AND: [
                {
                  name,
                },
                {
                  latitude,
                },
                {
                  longitude,
                },
              ],
            },
          });
          if (existingCoffeeShop) {
            return {
              ok: false,
              error: "This CoffeeShop is already exist.",
            };
          }

          let categoriesObj = [];
          if (categories) {
            categoriesObj = categories.map((category) => ({
              where: { name: category },
              create: { name: category, slug: slug(category, "_") },
            }));
          }

          let photosObj = [];
          if (photos) {
            await photos.map(async (photo) => {
              const { filename, createReadStream } = await photo;
              const newFilename = `${
                loggedInUser.id
              }-${Date.now()}-${filename}`;
              const readStream = createReadStream();
              const writeStream = createWriteStream(
                process.cwd() + "/uploads/" + newFilename
              );
              readStream.pipe(writeStream);
              const url = `http://localhost:4000/static/${newFilename}`;
              photosObj.push({ url: url });
            });
          }

          await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoriesObj.length > 0 && {
                categories: {
                  connectOrCreate: categoriesObj,
                },
              }),
              ...(photosObj.length > 0 && {
                photos: {
                  create: photosObj,
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: "Cant create coffeshop.",
          };
        }
      }
    ),
  },
};
