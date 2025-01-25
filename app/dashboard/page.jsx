"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

const Dashboard = () => {
  const [videoList, setVideolist] = useState([]);

  return (
    <div className="m-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+Create New</Button>
        </Link>
      </div>
      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
