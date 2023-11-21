"use client";

import BaseElement from "@/models/base_element";
import Screen, { ScreenContext } from "@/models/screen";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react";

// Create a context for the screen model
const ScreenContext = createContext<ScreenContext>({
  screen: null,
  selectedElementId: null,
  selectedElement: undefined,
  addElement: () => {},
  updateElement: () => {},
  setSelectedElementId: () => {},
  removeElement: (elementId: string) => {},
});

// Create a provider hook
/**
 * Custom hook for managing the screen state and providing utility functions.
 * @returns An object containing the current screen state, the addElement function, and the updateElement function.
 */
/**
 * Custom hook for managing screen state and elements.
 * @returns An object containing screen state and element management functions.
 */
export const useScreenProvider = () => {
  const [screen, setScreen] = useState<Screen | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  // Load the default value from localStorage on component mount
  useEffect(() => {
    const defaultValue = localStorage.getItem("screen");
    if (defaultValue) {
      setScreen(JSON.parse(defaultValue));
    }
  }, []);

  // Save the screen model to localStorage whenever it changes
  useEffect(() => {
    if (!screen) return;
    localStorage.setItem("screen", JSON.stringify(screen));
  }, [screen]);

  /**
   * Adds an element to the screen.
   * @param element The element to be added.
   */
  const addElement = (element: BaseElement) => {
    setScreen((prevScreen) => {
      if (!prevScreen)
        return {
          elements: [element],
        };
      return {
        ...prevScreen,
        elements: [...prevScreen.elements, element],
      };
    });
  };

  /**
   * Updates an element in the screen.
   * @param updatedElement The updated element.
   */
  const updateElement = useCallback(
    (updatedElement: BaseElement) => {
      setScreen((prevScreen) => {
        if (prevScreen) {
          const updatedElements = prevScreen.elements.map((element) => {
            if (element.id === selectedElementId) {
              return updatedElement;
            }
            return element;
          });
          return {
            ...prevScreen,
            elements: updatedElements,
          };
        }
        return null;
      });
    },
    [selectedElementId]
  );

  const removeElement = useCallback(
    (elementId: string) => {
      setScreen((prevScreen) => {
        if (prevScreen) {
          const updatedElements = prevScreen.elements.filter(
            (element) => element.id !== elementId
          );
          return {
            ...prevScreen,
            elements: updatedElements,
          };
        }
        return null;
      });
    },
    [selectedElementId]
  );

  /**
   * Retrieves the selected element from the screen.
   * @returns The selected element, or undefined if not found.
   */
  const selectedElement = useMemo(() => {
    if (!screen || !selectedElementId) return undefined;
    return screen.elements.find((element) => element.id === selectedElementId);
  }, [screen, selectedElementId]);

  return {
    screen,
    selectedElementId,
    selectedElement,
    addElement,
    updateElement,
    setSelectedElementId,
    removeElement,
  };
};

// Create a custom hook to access the screen model
export const useScreen = () => useContext(ScreenContext);

// Create a ScreenProvider component to wrap your app with
export const ScreenProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const screen = useScreenProvider();

  return (
    <ScreenContext.Provider value={screen}>{children}</ScreenContext.Provider>
  );
};
