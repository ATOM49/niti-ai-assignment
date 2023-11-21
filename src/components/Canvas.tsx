"use client";

import { useScreen } from "@/hooks/useScreen";
import React from "react";
import Element from "./Element";
import { useDrop } from "react-dnd";
import { SUPPORTED_TYPES } from "./Toolbar";
import { ElementType } from "@/models/base_element";
import { v4 } from "uuid";

function Canvas() {
  const { screen, addElement } = useScreen();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: SUPPORTED_TYPES,
    drop: (item: { type: ElementType }) => {
      addElement({
        id: v4(),
        type: item.type,
        label: item.type.toLocaleUpperCase(),
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop(),
    }),
  }));
  return (
    <div
      className={`${
        isOver ? "bg-slate-200" : "bg-white"
      } w-[390px] h-[844px] rounded-sm p-4`}
    >
      <div className="flex flex-col gap-2" ref={drop}>
        {screen?.elements.map((element) => (
          <Element key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
}

export default Canvas;
