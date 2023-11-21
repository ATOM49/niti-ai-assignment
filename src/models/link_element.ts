import BaseElement from "./base_element";

interface LinkElement extends BaseElement {
  type: "hyperlink";
  href: string;
}
export default LinkElement;
