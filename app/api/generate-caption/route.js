// npm install assemblyai

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();
    console.log("audioFileUrl", audioFileUrl);
    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API,
    });

    //   const audioUrl = "https://assembly.ai/sports_injuries.mp3";
    const FILE_URL = audioFileUrl;

    const config = {
      audio_url: FILE_URL,
    };

    const transcript = await client.transcripts.transcribe(config);
    if (transcript.status === "error") {
      console.error(`Transcription failed: ${transcript.error}`);
      // process.exit(1)
      return NextResponse.json({ error: transcript.error });
    }
    console.log(transcript);
    return NextResponse.json({ result: transcript.words });
  } catch (err) {
    console.log("error in gemeerateCaption", err);
    return NextResponse.json({ "error: ": err });
  }
}
