import { useContext, useState } from "react";
import { HelpAnchorsContext } from "./helpAnchorsContext.js";
import HelpOverlay from "./HelpOverlay.jsx";

export function HelpAnchorsProvider({ children }) {
  const [isHelpOpen, setIsHelpOpen] = useState(true);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <HelpAnchorsContext.Provider
      value={{
        isHelpOpen,
        openHelp,
        closeHelp,
      }}
    >
      {children}
      <HelpOverlay />
    </HelpAnchorsContext.Provider>
  );
}

export function useHelpOverlayControls() {
  const ctx = useContext(HelpAnchorsContext);
  if (!ctx) {
    throw new Error("useHelpOverlayControls must be used within HelpAnchorsProvider");
  }
  return {
    openHelp: ctx.openHelp,
    closeHelp: ctx.closeHelp,
    isHelpOpen: ctx.isHelpOpen,
  };
}
