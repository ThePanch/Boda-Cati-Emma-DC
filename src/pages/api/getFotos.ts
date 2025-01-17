import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "pancho",
  api_key: "983554942665456",
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const GET: APIRoute = async () => {
  try {
    // Uso de promesas para esperar resultados
    await cloudinary.api
      .resources()
      .then((result) => console.log(result))
      .then((result) => console.log(result));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Imágenes obtenidas correctamente.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al obtener imágenes de Cloudinary:", error);

    // En caso de error, devuelve un mensaje de error
    return new Response(
      JSON.stringify({
        error: "No se pudieron obtener las imágenes.",
        details: "error.message",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
