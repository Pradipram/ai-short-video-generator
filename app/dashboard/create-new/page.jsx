"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectToppics from "./_components/SelectToppics";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { GenerateImageService } from "../../../configs/imageGenratorModel";
import Image from "next/image";
import { VideoDataContext } from "../../_context/VideoDataContext";
import { db } from "../../../configs/db";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "../../../configs/schema";
import PlayerDialog from './../_components/PlayerDialog';

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState([]);
  const {videoData,setVideoData} = useContext(VideoDataContext);
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId,setVideoId] = useState(1);
  const {user} = useUser();


  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const validateForm = () => {
    if (!formData.toppic) {
      alert("Please select Toppic");
      return false;
    }
    if (!formData.style) {
      alert("Please select Style");
      return false;
    }
    if (!formData.duration) {
      alert("Please select Duration");
      return false;
    }
    return true;
  }

  //get video script
  const GetVideoScript = async () => {
    if (!validateForm()) {
      // alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    console.log("generating video script");
    const prompt = `write a script to generate ${formData.duration} video on toppic :${formData.toppic} along with AI images prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and ContextText as field`;
    // console.log(prompt);
    const result = await axios.post("/api/get-video-script", {
        prompt: prompt,
    });
    if(result.status === 200){
      console.log("video-script", result.data.result.video_script);
      if(result.data.result.video_script){
        setVideoScript(result.data.result.video_script);
        GenerateAudioFile(result.data.result.video_script);
        setVideoData(prev => ({
          ...prev,
          'videoScript': result.data.result.video_script
        }))
        // setLoading(false);
      }
      else{
        alert("something went wrong");
        setLoading(false);
      }
    }
    else{
      alert("Internal server error");
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    console.log("generating audio file");
    setLoading(true);
    try {
      let script = "";
      const id = uuidv4();
      videoScriptData.forEach((item) => {
        script += item.contextText + " ";
      });
      console.log("audioScript", script);

      const result = await axios.post("/api/generate-audio", {
          // text: scrpt,
          text: script,
          id: id,
        })
      console.log("generate-audio-file-result",result);
      if(result.status === 200 && result.data.result){
        console.log("audio-file-url", result.data.result);
        setAudioFileUrl(result.data.result);
        GenerateAudioCaption(result.data.result,videoScriptData);
        setVideoData(prev => ({
          ...prev,
          'audioFileUrl': result.data.result
        }))
        // setLoading(false);
      }
      else{
        alert("something went wrong");
        setLoading(false);
      }
    } catch (err) {
      console.log("error in geenrateAudioFile", err);
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl,videoScriptData) => {
    setLoading(true);
    console.log("generating audio caption");
    // console.log("audio-file-url", fileUrl);
    const result = await axios
      .post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      })
    console.log("caption-result",result);
    if(result && result.status === 200 && result.data.result){
      // console.log("caption-result", result.data.result);
      setVideoData(prev => ({
        ...prev,
        'captions': result.data.result
      }))
      setCaptions(result.data.result);
      GenerateImage(videoScriptData);
      // setLoading(false);
    }
    else{
      setLoading(false);
      alert("something went wrong");
    }
  };

  const GenerateImage = async (videoScriptData) => {
    // console.log("videoScriptData", videoScriptData);
    setLoading(true);
    console.log("generating image");
    let images = [];
    for (const element of videoScriptData) {
      // console.log("element", element);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const url = await GenerateImageService(element?.imagePrompt);
      console.log("image-url", url);
      images.push(url);
    }
    // setImageUrl(url); // Works in the clients
    // console.log("image-generated", images);
    // console.log(images,videoScript,audioFileUrl,captions);
    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }))
    setImageList(images);
    setLoading(false);
    console.log("everything generated");
  };

  useEffect(() => {
    console.log("videoData",videoData);
    if(Object.keys(videoData).length === 4){
      SaveVideoData(videoData);
    }
  },[videoData])

  const SaveVideoData = async(Video) => {
    setLoading(true);

    try{
      const result = await db.insert(VideoData).values({
        script: Video.videoScript,
        audioFileUrl: Video.audioFileUrl,
        captions: Video.captions,
        imageList: Video.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress
      }).returning({id: VideoData?.id});
      setVideoData(result[0].id);
      setPlayVideo(true);
      console.log(result);
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  const onCreateClickHandler = () => {
    try {
      GetVideoScript();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:px-20 mt-10">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectToppics onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-5 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
    </div>
  );
};

export default CreateNew;
