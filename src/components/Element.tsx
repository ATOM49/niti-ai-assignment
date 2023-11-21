"use client";

import { useScreen } from "@/hooks/useScreen";
import ButtonElement from "@/models/button_element";
import { Elements } from "@/models/screen";
import { forwardRef, useState } from "react";
import Button from "./button";
import Label from "./label";
import HyderLink from "./hyperlink";
import LinkElement from "@/models/link_element";
import BaseElement from "@/models/base_element";

export const Element = forwardRef((element: Elements, ref: React.Ref<any>) => {
  switch (element.type) {
    case "button":
      const button = element as ButtonElement;
      return <Button ref={ref} key={element.id} {...button} />;
    case "label":
      const label = element as BaseElement;
      return <Label ref={ref} key={element.id} {...label} />;
    case "hyperlink":
      const link = element as LinkElement;
      return <HyderLink ref={ref} key={element.id} {...link} />;
    default:
      return null;
  }
});
const withHover = (WrappedComponent: React.ComponentType<Elements>) => {
  const ElementWithHover = (props: Elements) => {
    const { setSelectedElementId } = useScreen();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${isHovered ? "hover:bg-gray-200" : ""}`}
      >
        <WrappedComponent {...props} />
        {isHovered && (
          <button
            className="absolute top-0 right-0 p-1 bg-blue-500 text-white text-sm rounded"
            onClick={() => {
              setSelectedElementId(props.id);
            }}
          >
            Edit
          </button>
        )}
      </div>
    );
  };

  return ElementWithHover;
};

export default withHover(Element);
