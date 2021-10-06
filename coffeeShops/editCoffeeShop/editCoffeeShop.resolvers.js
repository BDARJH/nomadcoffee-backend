import slug from "slug";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, name, photos, categories }, { loggedInUser }) => {
        const existingCoffeeShop = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
        });
        if (!existingCoffeeShop) {
          return {
            ok: false,
            error: "CoffeeShop not Found",
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
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            const url = `http://localhost:4000/static/${newFilename}`;
            photosObj.push({ url: url });
          });
        }

        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            ...(categoriesObj.length > 0 && {
              categories: {
                disconnect: existingCoffeeShop.categories,
                connectOrCreate: categoriesObj,
              },
            }),
            ...(photosObj.length > 0 && {
              photos: {
                deleteMany: existingCoffeeShop.photos,
                create: photosObj,
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
