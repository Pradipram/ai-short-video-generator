import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function query(data) {
  try {
    const token = process.env.NEXT_PUBLIC_HUGGING_FACE_API;
    // console.log("token", token);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  } catch (err) {
    console.log("error in query", err);
  }
}

export const GenerateImageService = async (text) => {
  const response = await query({ inputs: text });
  if (response) {
    const base64Data = await convertBlobToBase64(response);
    const base64String = base64Data.split(",")[1];
    const buffer = Buffer.from(base64String, "base64");
    const fileRef = ref(storage, `generated-images/${Date.now()}.png`);
    await uploadBytes(fileRef, buffer, { contentType: "image/png" });
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  }
};
