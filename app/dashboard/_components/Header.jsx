import Image from "next/image";
import React, { useContext, useEffect } from "react";
// import { Button } from "@/components/ui/button.jsx";
import { Button } from "./../../../components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "../../_context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    console.log("userDetail", userDetail);
  }, [userDetail]);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.png"} width={30} height={30} alt="logo" />
        <h2 className="font-bold text-xl">Ai Short video</h2>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 items-center">
          <Image src={"/dollar.png"} alt="dollar" height={20} width={20} />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Button>DashBoard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
