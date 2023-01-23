import sha1 from "https://esm.sh/sha1@1.1.1";
import { v4 as uuidv4 } from "npm:uuid@9.0.0";
import { env } from "./config.ts";

export const leafletMapUrlGenerator = async (bufferURI: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const public_id = uuidv4();

  // authentication signature for interacting with cloudinary upload api
  const cloudinaryRequestSignature = sha1(
    `public_id=${public_id}&timestamp=${timestamp}${env.CLOUDINARY_SECRET_API_KEY}`
  ).toString();

  const body = {
    public_id,
    api_key: env.CLOUDINARY_API_KEY,
    file: bufferURI,
    signature: cloudinaryRequestSignature,
    timestamp,
  };

  // upload map image to cloudinary's Upload API
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.json();
};
