import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home and welcome to ai-short video generator</h1>
      <UserButton />
    </div>
  );
}
