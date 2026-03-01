import { useCallback, useContext, useRef, useState } from "react";
import { HelpAnchorsContext } from "./helpAnchorsContext.js";
import HelpOverlay from "./HelpOverlay.jsx";

export function HelpAnchorsProvider({ children }) {
  const anchorsRef = useRef({});
  const [revision, setRevision] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(true);

  const register = useCallback((id, el) => {
    if (el) anchorsRef.current[id] = el;
    else delete anchorsRef.current[id];
    setRevision((n) => n + 1);
  }, []);

  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <HelpAnchorsContext.Provider
      value={{
        register,
        anchorsRef,
        revision,
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

export function useHelpAnchorRef(id) {
  const ctx = useContext(HelpAnchorsContext);
  if (!ctx) {
    throw new Error("useHelpAnchorRef must be used within HelpAnchorsProvider");
  }
  const { register } = ctx;
  return useCallback((el) => register(id, el), [register, id]);
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
