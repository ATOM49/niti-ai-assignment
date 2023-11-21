import BaseElement from "./base_element";

interface ButtonElement extends BaseElement {
  type: "button";
  onClick: () => void;
}

export default ButtonElement;
