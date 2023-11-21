import { useScreen } from "@/hooks/useScreen";
import React from "react";
import { v4 } from "uuid";
import { Element } from "./Element";
import { ElementType } from "@/models/base_element";
import { useDrag } from "react-dnd";

const BUTTON_CREATOR_STYLE = {
  color: "white",
  backgroundColor: "#1D4ED8",
  borderColor: "#1D4ED8",
  marginRight: "8px",
};

const LABEL_CREATOR_STYLE = {
  color: "white",
  backgroundColor: "#111827",
  borderColor: "#111827",
  marginRight: "8px",
};

const HYPERLINK_CREATOR_STYLE = {
  color: "#1D4ED8",
  marginRight: "8px",
};

const getStyleForType = (type: ElementType) => {
  switch (type) {
    case "button":
      return BUTTON_CREATOR_STYLE;
    case "label":
      return LABEL_CREATOR_STYLE;
    case "hyperlink":
      return HYPERLINK_CREATOR_STYLE;
  }
};

function Creator({ type }: { type: ElementType }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const { addElement } = useScreen();
  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => {
        addElement({
          id: v4(),
          type: type,
          label: type.toLocaleUpperCase(),
        });
      }}
    >
      <Element
        role="Handle"
        ref={drag}
        id="create"
        type={type}
        label={`${type.toLocaleUpperCase()}`}
        styleProperties={getStyleForType(type)}
      />
    </div>
  );
}

export default Creator;
