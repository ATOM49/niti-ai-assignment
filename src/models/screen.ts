import BaseElement from "./base_element";
import ButtonElement from "./button_element";
import LinkElement from "./link_element";

export type Elements = BaseElement | ButtonElement | LinkElement;

interface Screen {
  elements: Elements[];
}

export type ScreenContext = {
  screen: Screen | null;
  selectedElementId: string | null;
  selectedElement: Elements | undefined;
  addElement: (element: Elements) => void;
  updateElement: (updatedElement: Elements) => void;
  setSelectedElementId: (id: string | null) => void;
  removeElement: (elementId: string) => void;
};

export default Screen;
