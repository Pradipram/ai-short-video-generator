// import { storage } from "@/configs/FirebaseConfig";
import { storage } from "../../../configs/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});
export async function POST(req) {
  const { text, id } = await req.json();
  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile("output.mp3", response.audioContent, "binary");

  const audioBuffer = Buffer.from(response.audioContent, "binary");
  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
  const downloadURL = await getDownloadURL(storageRef);
  // console.log("Audio content written to file: output.mp3");
  console.log("download url: ", downloadURL);

  return NextResponse.json({ result: downloadURL });
}
