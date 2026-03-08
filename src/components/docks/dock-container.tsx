import { ReactNode } from "react";
import DockPortal from "../portal/dock-portal";

interface DockContainerProps {
  children: ReactNode;
}

export default function DockContainer({ children }: DockContainerProps) {
  return (
    <DockPortal mobileOnly={false}>
      <div className="bg-secondary">
        <div className="container mx-auto flex items-center gap-3 p-5">
          {children}
        </div>
      </div>
    </DockPortal>
  );
}
