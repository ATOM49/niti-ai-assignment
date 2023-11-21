"use client";
import { useScreen } from "@/hooks/useScreen";
import LinkElement from "@/models/link_element";
import React, { useState } from "react";

const SUPPORTED_STYLE_PROPERTIES: (keyof StyleProperties)[] = [
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "fontSize",
  "fontWeight",
  "color",
];

function PropertyEditor() {
  const { selectedElement, updateElement, removeElement } = useScreen();
  const [label, setLabel] = useState(selectedElement?.label);
  const [href, setHref] = useState(
    selectedElement?.type === "hyperlink"
      ? (selectedElement as LinkElement).href
      : ""
  );
  const [propertyValues, setPropertyValues] = useState<
    StyleProperties | undefined
  >(selectedElement?.styleProperties);

  const handleInputChange = (
    property: keyof StyleProperties,
    value: string
  ) => {
    setPropertyValues((prevPropertyValues) => ({
      ...prevPropertyValues,
      [property]: value,
    }));
  };
  if (!selectedElement) return null;

  return (
    <div className="flex flex-col gap-2 max-w-sm w-full h-full">
      <div className="flex justify-between items-center">
        <h2>
          Editing <b>{selectedElement.type}</b>
        </h2>
        <button
          className="ml-2 bg-red-500 text-white rounded-md p-2 text-sm"
          onClick={() => {
            if (!selectedElement) return;
            removeElement(selectedElement.id);
          }}
        >
          Delete
        </button>
      </div>
      <div key={"label"} className="flex flex-col mb-0.5">
        <label>Label:</label>
        <input
          type="text"
          className="text-black"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      {selectedElement?.type === "hyperlink" ? (
        <div key={"href"} className="flex flex-col mb-0.5">
          <label>Link URL:</label>
          <input
            type="text"
            className="text-black"
            value={href}
            onChange={(e) =>
              setHref(
                e.target.value.includes("http")
                  ? e.target.value
                  : `https://${e.target.value}`
              )
            }
          />
        </div>
      ) : null}
      {SUPPORTED_STYLE_PROPERTIES.map((property) => (
        <div key={property} className="flex flex-col mb-0.5">
          <label>{property}:</label>
          <input
            type="text"
            className="text-black"
            value={propertyValues?.[property]}
            onChange={(e) => handleInputChange(property, e.target.value)}
          />
        </div>
      ))}
      <div>
        <button
          className="bg-blue-500 text-white rounded-md p-2"
          onClick={() => {
            if (!selectedElement) return;
            if (selectedElement.type === "hyperlink")
              updateElement({
                ...selectedElement,
                label: label ?? selectedElement.label,
                href: href ?? (selectedElement as LinkElement).href,
                styleProperties: propertyValues,
              } as LinkElement);
            else
              updateElement({
                ...selectedElement,
                label: label ?? selectedElement.label,
                styleProperties: propertyValues,
              });
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default PropertyEditor;
