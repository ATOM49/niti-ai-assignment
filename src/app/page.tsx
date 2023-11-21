"use client";

import Canvas from "@/components/Canvas";
import PropertyEditor from "@/components/PropertyEditor";
import Toolbar from "@/components/Toolbar";
import { useScreen } from "@/hooks/useScreen";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const { selectedElement } = useScreen();
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="container h-screen w-screen">
        <Toolbar />
        <div className="flex columns-2 gap-4">
          <div className="grow justify-center items-center flex">
            <Canvas />
          </div>
          {selectedElement && <PropertyEditor />}
        </div>
      </main>
    </DndProvider>
  );
}
