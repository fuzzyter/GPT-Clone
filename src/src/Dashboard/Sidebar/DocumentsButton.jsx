import React from "react";
import layersIcon from "../../../assets/layers.png";

const DocumentsButton = ({ onOpenDocuments }) => {
  return (
    <div className="list_item documents_button" onClick={onOpenDocuments}>
      <div className="list_item_icon">
        <img className="documents_button_icon" src={layersIcon} alt="" />
      </div>
      
      <p className="list_item_text">Documents</p>
    </div>
  );
};

export default DocumentsButton;
