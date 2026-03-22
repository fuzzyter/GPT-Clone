import React from "react";
import settingIcon from "../../assets/setting.png";
import { useHelpOverlayControls } from "./Help/HelpAnchorsContext.jsx";

const TopRightButtons = ({ onOpenSettings }) => {
  const { openHelp } = useHelpOverlayControls();

  return (
    <div className="top_right_buttons">
      <button
        type="button"
        className="top_right_button help_button"
        onClick={openHelp}
        aria-label="Open help"
        title="Help"
      >
        ?
      </button>

      <button
        type="button"
        className="top_right_button settings_button"
        onClick={onOpenSettings}
        aria-label="Settings"
        title="Settings"
      >
        <img src={settingIcon} alt="Settings" className="settings_button_icon" />
      </button>
    </div>
  );
};

export default TopRightButtons;
