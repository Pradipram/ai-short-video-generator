import Image from "next/image";
import React from "react";
// import { Button } from "@/components/ui/button.jsx";
import { Button } from "./../../../components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.png"} width={30} height={30} alt="logo" />
        <h2 className="font-bold text-xl">Ai Short video</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button>DashBoard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
