import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteConversations } from "../dashboardSlice";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const DeleteConversationsButton = () => {
  const dispatch = useDispatch();
  const helpAnchorRef = useHelpAnchorRef("deleteAll");

  const handleDeleteConversations = () => {
    // Clear from localStorage
    localStorage.removeItem('conversations');
    
    // Clear from Redux store
    dispatch(deleteConversations());
  };

  return (
    <div
      ref={helpAnchorRef}
      className="list_item delete_conv_button"
      onClick={handleDeleteConversations}
    >
      <div className="list_item_icon">
        <AiOutlineDelete color="white" />
      </div>
      <p className="list_item_text">Delete conversations</p>
    </div>
  );
};

export default DeleteConversationsButton;
