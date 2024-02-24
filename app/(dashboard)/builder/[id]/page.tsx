import React from "react";
import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

const BuilderId = async ({ params: { id } }: { params: { id: string } }) => {
  const form = await GetFormById(Number.parseInt(id));
  if (!form) {
    throw new Error("Not found");
  }
  return <FormBuilder form={form} />;
};

export default BuilderId;
