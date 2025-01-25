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
  

const PlayerDialog = ({playVideo,videoId}) => {
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setOpenDialog(playVideo)
    },[playVideo])


  return (
    <Dialog open={playVideo}>
  <DialogContent className="bg-white flex flex-col items-center">
    <DialogHeader>
      <DialogTitle className="text-3xl font-bold my-5">Your video is ready</DialogTitle>
      <DialogDescription asChild>
        <div>
            <Player
                component={RemotionVideo}
                durationInFrames={120}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
            />
            <div className="flex gap-10">
              <Button variant="ghost">Cancel</Button>
              <Button>Export</Button>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default PlayerDialog