"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h2 className="text-destructive text-4xl">Somethings went wrong!</h2>
      <Button>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default Error;
