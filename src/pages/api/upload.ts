import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "pancho",
  api_key: "983554942665456",
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

const uploadStream = async (
  buffer: Uint8Array,
  options: { folder: string }
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result);
        reject(error);
      })
      .end(buffer);
  });
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const fotoApi = formData.get("file") as File;

  if (!fotoApi) {
    return new Response("No se ha seleccionado una foto", {
      status: 400,
    });
  }

  const arrayBuffer = await fotoApi.arrayBuffer();
  const unit8Array = new Uint8Array(arrayBuffer);

  const result = await uploadStream(unit8Array, {
    folder: "boda",
  });
  console.log(result);

  const url = result;

  return new Response(JSON.stringify({ url }));
};
