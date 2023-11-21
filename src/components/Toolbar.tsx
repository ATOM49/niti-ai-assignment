import React from "react";
import Creator from "./Creator";
import { ElementType } from "@/models/base_element";

export const SUPPORTED_TYPES: ElementType[] = ["button", "label", "hyperlink"];

function Toolbar() {
  return (
    <div className="flex flex-row gap-2 w-full p-2 items-center">
      <h2 className="text-2xl font-bold mr-8">Toolbar</h2>
      {SUPPORTED_TYPES.map((type) => (
        <Creator key={type} type={type} />
      ))}
    </div>
  );
}

export default Toolbar;
