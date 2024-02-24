import React from "react";
import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";

const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdPreview className="h-6 w-6" />
      <span>preview</span>
    </Button>
  );
};

export default PreviewDialogBtn;
