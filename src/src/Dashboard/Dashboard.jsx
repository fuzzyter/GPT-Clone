import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Chat from "./Chat/Chat.jsx";
import { HelpAnchorsProvider } from "./Help/HelpAnchorsContext.jsx";
import TopRightButtons from "./TopRightButtons.jsx";
import backButtonIcon from "../../assets/back-button.png";

import "./dashboard.css";

const Dashboard = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const minFontSize = 12;
  const maxFontSize = 20;

  const openSettings = () => {
    setIsSettingsOpen(true);
  };


  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleSidebarConversationSelect = () => {
    if (isSettingsOpen) {
      closeSettings();
    }

  };

  useEffect(() => {
    const saved = localStorage.getItem("uiFontSize");
    if (saved) {
      const numberValue = Number(saved);
      if (!Number.isNaN(numberValue)) {
        setFontSize(numberValue);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--ui-font-size", `${fontSize}px`);
    localStorage.setItem("uiFontSize", String(fontSize));
  }, [fontSize]);

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(minFontSize, prev - 1));
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(maxFontSize, prev + 1));
  };

  return (
    <HelpAnchorsProvider>
      <div className="dashboard_container">
        <TopRightButtons onOpenSettings={openSettings} />
        <Sidebar onSelectConversation={handleSidebarConversationSelect} />
        {isSettingsOpen ? (
          <div className="chat_container settings_page">
            <div className="settings_page_top">
              <button
                type="button"
                className="settings_back_button"
                onClick={closeSettings}
                aria-label="Back"
                title="Back"
              >
                <img className="settings_back_icon" src={backButtonIcon} alt="" />
              </button>
              <h2 className="settings_title">Settings</h2>
            </div>

            <div className="settings_content">
              <div className="settings_row">
                <p className="settings_label">Font size</p>
                <div className="settings_font_size_controls">
                  <button
                    type="button"
                    className="settings_font_size_button"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= minFontSize}
                    aria-label="Decrease font size"
                    title="Decrease"
                  >
                    -
                  </button>
                  <p className="settings_value">{fontSize}px</p>
                  <button
                    type="button"
                    className="settings_font_size_button"
                    onClick={increaseFontSize}
                    disabled={fontSize >= maxFontSize}
                    aria-label="Increase font size"
                    title="Increase"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Chat />
          
        )}
      </div>
    </HelpAnchorsProvider>
  );
};

export default Dashboard;
