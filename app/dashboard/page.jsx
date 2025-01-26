"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { VideoData } from "../../configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "../../configs/db";

const Dashboard = () => {
  const [videoList, setVideolist] = useState([]);
  const [fetched, setFetched] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (!user?.isLoaded || !user?.isSignedIn || fetched) return;
    setFetched(true);
    // console.log(user);
    user && GetVideoList(user.user);
  }, [user, fetched]);

  const GetVideoList = async (user) => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));
    // console.log(user?.primaryEmailAddress);
    // console.log(result);
    setVideolist(result);
  };

  return (
    <div className="m-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+Create New</Button>
        </Link>
      </div>

      {/* Empty state */}
      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/* List of videos  */}
    </div>
  );
};

export default Dashboard;
