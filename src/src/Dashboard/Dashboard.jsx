import React from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Chat from "./Chat/Chat.jsx";
import { HelpAnchorsProvider } from "./Help/HelpAnchorsContext.jsx";
import TopRightButtons from "./TopRightButtons.jsx";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <HelpAnchorsProvider>
      <div className="dashboard_container">
        <TopRightButtons />
        <Sidebar />
        <Chat />
      </div>
    </HelpAnchorsProvider>
  );
};

export default Dashboard;
