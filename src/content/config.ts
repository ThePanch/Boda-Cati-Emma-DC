import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

const fotos = defineCollection({
  loader: cldAssetsLoader({
    limit: 50,
    folder: "boda",
  }),
});

export const collections = {
  fotos,
};
