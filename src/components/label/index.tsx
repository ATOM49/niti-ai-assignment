import React, { forwardRef } from "react";
import BaseElement from "@/models/base_element";
interface LabelElement extends BaseElement {}

const Label = forwardRef<HTMLLabelElement, LabelElement>(
  ({ label, styleProperties }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-black font-bold`}
        style={styleProperties}
      >
        {label}
      </label>
    );
  }
);

export default Label;
