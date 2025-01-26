"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { UserDetailContext } from "./../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db } from "../../configs/db";
import { Users } from "../../configs/schema";
import { eq } from "drizzle-orm";

const DashboardLayout = ({ children }) => {
  const [userDetail, setUserDetail] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && getUserDetail();
  }, [user?.user]);

  const getUserDetail = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.user?.primaryEmailAddress?.emailAddress));
    setUserDetail(result[0]);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <div className="hidden md:block h-screen bg-red fixed mt-[65px] w-64">
          <SideNav />
        </div>
        <div>
          <Header />
          <div className="md:ml-64">{children}</div>
        </div>
      </div>
    </UserDetailContext.Provider>
  );
};

export default DashboardLayout;
