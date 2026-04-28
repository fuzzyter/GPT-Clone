import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsSend } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import layersIcon from "../../../assets/layers.png";
import { addMessage, setSelectedConversationId, sendConversationMessage } from "../dashboardSlice";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const NewMessageInput = () => {
  const [content, setContent] = useState("");
  const [isDocumentPickerOpen, setIsDocumentPickerOpen] = useState(false);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const inputWrapRef = useRef(null);
  const helpAnchorRef = useHelpAnchorRef("composer");

  const dispatch = useDispatch();

  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );

  const conversations = useSelector((state) => state.dashboard.conversations);
  const loading = useSelector((state) => state.dashboard.loading);

  const formatDocumentTime = (savedAt) => {
    if (!savedAt) return "-";
    const date = new Date(savedAt);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleDocumentPicker = () => {
    if (isDocumentPickerOpen) {
      setIsDocumentPickerOpen(false);
      return;
    }

    const savedDocuments = localStorage.getItem("documents");
    if (!savedDocuments) {
      setDocuments([]);
      setIsDocumentPickerOpen(true);
      return;
    }

    const parsedDocuments = JSON.parse(savedDocuments);
    if (Array.isArray(parsedDocuments)) {
      setDocuments(parsedDocuments);
    } else {
      setDocuments([]);
    }
    setIsDocumentPickerOpen(true);
  };

  const toggleSelectedDocument = (documentId) => {
    if (selectedDocumentIds.includes(documentId)) {
      setSelectedDocumentIds(selectedDocumentIds.filter((id) => id !== documentId));
    } else {
      setSelectedDocumentIds([...selectedDocumentIds, documentId]);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isDocumentPickerOpen) return;
      if (!inputWrapRef.current) return;
      if (inputWrapRef.current.contains(event.target)) return;
      setIsDocumentPickerOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };

  }, [isDocumentPickerOpen]);

  const proceedMessage = () => {
    if (!content.trim()) return;

    const message = {
      aiMessage: false,
      content,
      id: uuid(),
    };

    const conversationId =
      selectedConversationId === "new" ? uuid() : selectedConversationId;

    // Add user message to store
    dispatch(
      addMessage({
        conversationId,
        message,
      })
    );

    dispatch(setSelectedConversationId(conversationId));

    // Get conversation messages for context
    const conversation = conversations.find(c => c.id === conversationId);
    const conversationMessages = conversation ? conversation.messages : [];
    const selectedDocuments = documents.filter((item) =>
      selectedDocumentIds.includes(item.id)
    );

    // Send message to AI
    dispatch(sendConversationMessage({ 
      message, 
      conversationId,
      conversationMessages,
      selectedDocuments,
    }));

    // Reset input
    setContent("");
    setSelectedDocumentIds([]);
    setIsDocumentPickerOpen(false);
  };

  const handleSendMessage = () => {
    if (content.trim().length > 0 && !loading) {
      proceedMessage();
    }
  };

  const handleKeyPressed = (event) => {
    if (event.code !== "Enter" || loading) return;
    if (event.shiftKey) return;
    if (content.trim().length === 0) return;
    event.preventDefault();
    proceedMessage();
  };

  return (
    <div ref={helpAnchorRef} className="new_message_input_container">
      <div
        ref={inputWrapRef}
        className={
          selectedDocumentIds.length > 0
            ? "new_message_input_wrap has_selected_docs"
            : "new_message_input_wrap"
        }
      >
        {isDocumentPickerOpen ? (
          <div className="document_picker_panel">
            {documents.map((item) => (

              <button
                key={item.id}
                type="button"

                className={
                  selectedDocumentIds.includes(item.id)
                    ? "document_picker_card is_selected"
                    : "document_picker_card"
                }
                onClick={() => toggleSelectedDocument(item.id)}
              >
                <p className="document_picker_content">{item.content}</p>
                <p className="document_picker_saved_time">
                  {formatDocumentTime(item.savedAt)}
                </p>
              </button>

            ))}
          </div>
        ) : null}
        <textarea
          className="new_message_input"
          rows={1}
          placeholder={loading ? "Waiting for response..." : "Send a message ..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPressed}
          disabled={loading}
        />
        <div className="new_message_left_controls">
          
          <button
            type="button"
            className={
              isDocumentPickerOpen
                ? "new_message_doc_icon_container is_active"
                : "new_message_doc_icon_container"
            }
            onClick={toggleDocumentPicker}
            disabled={loading}
            title="Insert documents"
            aria-label="Insert documents"
          >

            <img className="new_message_doc_icon" src={layersIcon} alt="" />
          </button>

          {selectedDocumentIds.length > 0 ? (
            <div className="selected_docs_badge">
              {selectedDocumentIds.length}{" "}
              {selectedDocumentIds.length === 1 ? "doc" : "docs"} selected
            </div>
          ) : null}
        </div>
        <div className="new_message_icon_container" onClick={handleSendMessage}>
          <BsSend color={loading ? "lightgrey" : "grey"} />
        </div>
      </div>
    </div>
  );
};

export default NewMessageInput;
