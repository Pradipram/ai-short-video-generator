"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "./../configs/db";
import { Users } from "./../configs/schema";
import { eq } from "drizzle-orm";
import { VideoDataContext } from "./_context/VideoDataContext";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    user && isNewUser();
  }, [user]);

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    // console.log("result", result);
    if (!result[0]) {
      await db.insert(Users).values({
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    }
  };

  return (
  <VideoDataContext.Provider value={{ videoData, setVideoData }}>
  <div>{children}</div>
  </VideoDataContext.Provider>);
};

export default Provider;
