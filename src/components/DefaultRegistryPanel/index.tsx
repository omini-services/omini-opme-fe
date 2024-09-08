import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ReactNode, useState } from "react";

interface DefaultPanelRegistryProps {
  left: { content: ReactNode, width?: number }
  right: { content: ReactNode, width?: number }
}

export function DefaultPanelRegistry({ left, right }: DefaultPanelRegistryProps) {
  const [layout, setLayout] = useState([left?.width ?? 30, right?.width ?? 70]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => setLayout(sizes)}
      className="h-full items-stretch space-y-2"
    >
      <ResizablePanel minSize = {layout[0]} defaultSize={layout[0]}>
        {left.content}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={layout[1]}>
        {right.content}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
