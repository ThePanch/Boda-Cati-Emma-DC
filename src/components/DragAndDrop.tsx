import { navigate } from "astro:transitions/client";
import React, { useState, type ChangeEvent } from "react";

export const DragAndDrop = () => {
  const [estado, setEstado] = useState("");
  async function handleClick(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as any;
    const foto = target.files[0];
    const formData = new FormData();

    formData.append("file", foto);
    // console.log(foto);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setEstado("Error al subir la foto");
      return;
    }

    const json = await res.json();
    const url = json.url.secure_url;

    const resCargarFoto = await fetch(
      "https://manso-editorial-backend.vercel.app/api/fotos",
      {
        method: "POST",
        body: JSON.stringify({ url: url }),
      }
    );
    console.log(resCargarFoto);

    navigate("/fotos");
  }

  return (
    <div className="flex items-center justify-center bg-[#FEFBE6] w-[219px] h-32 mb-2">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-[#BF9066]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-[#BF9066]">
              SELECCIONAR UNA FOTO
            </span>
          </p>
          <p className="text-xs text-[#BF9066]">MAX. 10MB</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => handleClick(e)}
        />
      </label>
    </div>
  );
};
