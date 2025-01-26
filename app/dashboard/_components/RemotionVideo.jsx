import React, { useEffect, useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionVideo = ({
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
  script,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const totalFrames = useMemo(() => {
    return ((captions?.[captions.length - 1]?.end || 100) / 1000) * fps;
  }, [captions, fps]);

  useEffect(() => {
    setDurationInFrame(totalFrames);
  }, [totalFrames, setDurationInFrame]);

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; //convert frame to millisoconds
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption?.text;
  };

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((item, index) => {
          const startTime = (index * totalFrames) / imageList?.length;
          const duration = totalFrames;
          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          return (
            <Sequence
              key={index}
              from={startTime}
              durationInFrames={totalFrames}
            >
              <AbsoluteFill>
                <Img
                  src={item}
                  alt="remotion"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "blue",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 20,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                    // background: "rgba(0,0,0,0.5)",
                  }}
                >
                  <h2>{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          );
        })}
        {audioFileUrl && <Audio src={audioFileUrl} />}
      </AbsoluteFill>
    )
  );
};

export default RemotionVideo;
