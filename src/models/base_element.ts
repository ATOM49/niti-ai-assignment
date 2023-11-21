export type ElementType = "label" | "button" | "hyperlink";

interface BaseElement {
  id: string;
  type: ElementType;
  label: string;
  styleProperties?: StyleProperties;
  role?: string;
}

export default BaseElement;
