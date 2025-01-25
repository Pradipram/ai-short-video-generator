"use client";
import {
  CircleUserIcon,
  FileVideo,
  PanelsTopLeft,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const MenuOption = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 2,
      name: "create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/upgrade",
      icon: SquarePlus,
    },
    {
      id: 4,
      name: "Account",
      path: "/account",
      icon: CircleUserIcon,
    },
  ];

  const path = usePathname();

  return (
    <div className="w-64 h-screen shadow-md p-5">
      <div className="grid gap-3">
        {MenuOption.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white cursor-pointer rounded-md ${
                path === item.path && "bg-primary text-white"
              }`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
