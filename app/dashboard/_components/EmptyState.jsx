import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed rounded-md">
      <h2>You don't have any short video crated</h2>
      <Link href="/dashboard/create-new">
        <Button>Create New video</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
