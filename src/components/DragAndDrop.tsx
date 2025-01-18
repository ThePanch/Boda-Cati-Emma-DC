import { navigate } from "astro:transitions/client";
import React, { useState, type ChangeEvent } from "react";

export const DragAndDrop = () => {
  const [loading, setLoading] = useState(false);
  const [cargada, setCargada] = useState(false);
  const [error, setError] = useState(false);
  async function handleClick(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
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
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      setLoading(false);
      return;
    }

    setCargada(true);
    setTimeout(() => {
      setCargada(false);
    }, 2000);

    setLoading(false);

    // navigate("/fotos");
  }

  return (
    <div className="flex items-center justify-center bg-[#FEFBE6] w-[219px] h-32 mb-2">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
      >
        {!loading && !cargada ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-2 text-[#BF9066]"
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
            <p className="mb-1.5 text-sm text-gray-500 ">
              <span className="font-semibold text-[#BF9066]">
                SELECCIONAR UNA FOTO
              </span>
            </p>
            <p className="text-xs text-[#BF9066]">MAX. 10MB</p>
          </div>
        ) : (
          <div role="status" className=" py-7">
            {!cargada ? (
              <div className="flex flex-col h-full w-full items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="poppins-light text-sm text-[#BF9066] mt-3">
                  Cargando foto...
                </span>
              </div>
            ) : (
              <div>
                {error ? (
                  <div className="flex flex-col items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"
                      style={{ fill: "red", color: "white" }}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                    <span className="poppins-light text-sm  text-[#ef4444] mt-1">
                      Error al subir foto, <br />
                      pesa más de 10MB
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#008000] py-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-photo-check "
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v7" />
                      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
                      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l.5 .5" />
                      <path d="M15 19l2 2l4 -4" />
                    </svg>
                    <span className="poppins-light text-xs text-[#BF9066] mt-3">
                      Foto cargada correctamente
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
