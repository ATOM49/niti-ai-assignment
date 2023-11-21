import BaseElement from "@/models/base_element";
import React from "react";

interface ButtonProps extends BaseElement {
  //   onClick: () => {};
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, styleProperties }, ref) => {
    return (
      <button
        ref={ref}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        style={styleProperties}
        //   onClick={onClick}
      >
        {label}
      </button>
    );
  }
);

export default Button;
