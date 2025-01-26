"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { db } from "./../../../configs/db";
import { VideoData } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const PlayerDialog = ({ playVideo, videoId, setPlayVideo }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [video, setVideo] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);

  useEffect(() => {
    // setOpenDialog(playVideo);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    // console.log(result[0]);
    setVideo(result[0]);
  };

  return (
    <Dialog open={playVideo} onOpenChange={(open) => setPlayVideo(open)}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...video,
                  setDurationInFrame,
                }}
              />
              <div className="flex mt-10 justify-around">
                <Button variant="ghost" onClick={() => setPlayVideo(false)}>
                  Cancel
                </Button>
                <Button>Export</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
