import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Chat from "./Chat/Chat.jsx";
import { HelpAnchorsProvider } from "./Help/HelpAnchorsContext.jsx";
import TopRightButtons from "./TopRightButtons.jsx";
import backButtonIcon from "../../assets/back-button.png";
import searchIcon from "../../assets/search.png";
import { setSelectedConversationId } from "./dashboardSlice";

import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.dashboard.conversations);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isDocumentEditorOpen, setIsDocumentEditorOpen] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState(null);
  const [documentInput, setDocumentInput] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const minFontSize = 12;
  const maxFontSize = 20;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchedText, setLastSearchedText] = useState("");
  const [pendingScrollMessageId, setPendingScrollMessageId] = useState(null);

  const openSettings = () => {
    setIsSettingsOpen(true);
    setIsSearchOpen(false);
    setIsBookmarksOpen(false);
    setIsDocumentsOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsSettingsOpen(false);
    setIsBookmarksOpen(false);
    setIsDocumentsOpen(false);
  };

  const openBookmarks = () => {
    setIsBookmarksOpen(true);
    setIsSettingsOpen(false);
    setIsSearchOpen(false);
    setIsDocumentsOpen(false);
  };

  const openDocuments = () => {
    setIsDocumentsOpen(true);
    setIsSettingsOpen(false);
    setIsSearchOpen(false);
    setIsBookmarksOpen(false);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const closeBookmarks = () => {
    setIsBookmarksOpen(false);
  };

  const closeDocuments = () => {
    setIsDocumentsOpen(false);
    setIsDocumentEditorOpen(false);
    setEditingDocumentId(null);
    setDocumentInput("");
  };

  const runSearch = () => {
    const q = searchText.trim();
    setLastSearchedText(q);

    if (!q) {
      setSearchResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const matches = conversations.filter((c) => {
      if (!c || !Array.isArray(c.messages)) return false;

      for (let i = 0; i < c.messages.length; i++) {
        const m = c.messages[i];
        const text = String(m?.content || "");
        if (text.toLowerCase().includes(lower)) {
          return true;
        }
      }
      return false;
    });

    setSearchResults(matches);
  };

  const handleSearchKeyDown = (event) => {
    if (event.code !== "Enter") return;
    if (event.shiftKey) return;
    event.preventDefault();
    runSearch();
  };

  const openConversationFromSearch = (conversationId) => {
    dispatch(setSelectedConversationId(conversationId));
    closeSearch();
  };

  const openConversationFromBookmark = (conversationId, messageId) => {
    dispatch(setSelectedConversationId(conversationId));
    setPendingScrollMessageId(messageId);
    closeBookmarks();
  };

  const handleSidebarConversationSelect = () => {
    if (isSettingsOpen) {
      closeSettings();
    }
    if (isSearchOpen) {
      closeSearch();
    }
    if (isBookmarksOpen) {
      closeBookmarks();
    }
    if (isDocumentsOpen) {
      closeDocuments();
    }

  };

  useEffect(() => {
    if (!pendingScrollMessageId) return;

    const id = pendingScrollMessageId;
    setPendingScrollMessageId(null);

    setTimeout(() => {
      const el = document.getElementById(`chat-message-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  }, [pendingScrollMessageId]);

  const bookmarkedItems = [];
  for (let i = 0; i < conversations.length; i++) {
    const c = conversations[i];
    if (!c || !Array.isArray(c.messages)) continue;
    for (let j = 0; j < c.messages.length; j++) {
      const m = c.messages[j];
      if (m && m.bookmarked) {
        bookmarkedItems.push({
          conversationId: c.id,
          messageId: m.id,
          content: String(m.content || ""),
        });
      }
    }
  }

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
    const savedDocuments = localStorage.getItem("documents");
    if (savedDocuments) {
      const parsedDocuments = JSON.parse(savedDocuments);
      if (Array.isArray(parsedDocuments)) {
        setDocuments(parsedDocuments);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--ui-font-size", `${fontSize}px`);
    localStorage.setItem("uiFontSize", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(minFontSize, prev - 1));
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(maxFontSize, prev + 1));
  };

  const formatDocumentTime = (savedAt) => {
    if (!savedAt) return "";

    const date = new Date(savedAt);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const openAddDocumentEditor = () => {
    setEditingDocumentId(null);
    setDocumentInput("");
    setIsDocumentEditorOpen(true);
  };

  const openEditDocumentEditor = (documentItem) => {
    setEditingDocumentId(documentItem.id);
    setDocumentInput(documentItem.content);
    setIsDocumentEditorOpen(true);
  };

  const saveDocument = () => {
    const trimmedText = documentInput.trim();
    if (!trimmedText) return;
    const now = Date.now();

    if (editingDocumentId) {
      const nextDocuments = documents.map((item) => {
        if (item.id === editingDocumentId) {

          return {
            ...item,
            content: trimmedText,
            savedAt: now,
          };
        }
        return item;
      });

      setDocuments(nextDocuments);
    } else {
      const newDocument = {
        id: `doc-${Date.now()}`,
        content: trimmedText,
        savedAt: now,
      };
      setDocuments([newDocument, ...documents]);
    }

    setIsDocumentEditorOpen(false);
    setEditingDocumentId(null);
    setDocumentInput("");
  };

  const deleteDocument = (documentId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this document?");
    if (!shouldDelete) return;

    const nextDocuments = documents.filter((item) => item.id !== documentId);
    setDocuments(nextDocuments);
  };

  return (
    <HelpAnchorsProvider>
      <div className="dashboard_container">
        <TopRightButtons onOpenSettings={openSettings} />
        <Sidebar
          onSelectConversation={handleSidebarConversationSelect}
          onOpenSearch={openSearch}
          onOpenBookmarks={openBookmarks}
          onOpenDocuments={openDocuments}
        />
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
        ) : isSearchOpen ? (
          <div className="chat_container settings_page">
            <div className="settings_page_top">
              <button
                type="button"
                className="settings_back_button"
                onClick={closeSearch}
                aria-label="Back"
                title="Back"
              >
                <img className="settings_back_icon" src={backButtonIcon} alt="" />
              </button>
              <h2 className="settings_title">Search</h2>
            </div>

            <div className="settings_content">
              <div className="search_input_container">
                <div className="new_message_input_wrap search_input_wrap">
                  <img className="search_input_icon" src={searchIcon} alt="" />
                  <textarea
                    className="new_message_input search_textarea"
                    rows={1}
                    placeholder="Search conversations..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                  />
                </div>
              </div>

              <p className="search_results_count">
                Results: {searchResults.length}
                {lastSearchedText ? ` for "${lastSearchedText}"` : ""}
              </p>

              <div className="search_results_list">
                {searchResults.map((c) => {
                  const firstText = c?.messages?.[0]?.content || "Conversation";
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className="search_result_button"
                      onClick={() => openConversationFromSearch(c.id)}
                      title="Open conversation"
                    >
                      <p className="search_result_title">{firstText}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : isBookmarksOpen ? (
          <div className="chat_container settings_page">
            <div className="settings_page_top">
              <button
                type="button"
                className="settings_back_button"
                onClick={closeBookmarks}
                aria-label="Back"
                title="Back"
              >
                <img className="settings_back_icon" src={backButtonIcon} alt="" />
              </button>
              <h2 className="settings_title">Bookmarks</h2>
            </div>

            <div className="settings_content">
              <p className="search_results_count">Results: {bookmarkedItems.length}</p>

              <div className="search_results_list">
                {bookmarkedItems.map((item) => (
                  <button
                    key={item.messageId}
                    type="button"
                    className="bookmark_result_button"
                    onClick={() =>
                      openConversationFromBookmark(item.conversationId, item.messageId)
                    }
                    title="Open message"
                  >
                    <p className="bookmark_result_text">{item.content}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : isDocumentsOpen ? (
          <div className="chat_container settings_page">
            <div className="settings_page_top">
              <button
                type="button"
                className="settings_back_button"
                onClick={closeDocuments}
                aria-label="Back"
                title="Back"
              >
                <img className="settings_back_icon" src={backButtonIcon} alt="" />
              </button>
              <h2 className="settings_title">Documents</h2>
            </div>

            <div className="settings_content documents_content">
              {!isDocumentEditorOpen ? (
                <>
                  <button
                    type="button"
                    className="documents_add_button"
                    onClick={openAddDocumentEditor}
                    title="Add document"
                  >
                    <AiOutlinePlus />
                    <span>Add Document</span>
                  </button>

                  <div className="search_results_list documents_list">
                    {documents.map((item) => (
                      <div key={item.id} className="document_result_card">
                        <div className="document_result_text_view">
                          <p className="bookmark_result_text">{item.content}</p>
                        </div>

                        <div className="document_result_footer">
                          <p className="document_saved_time">
                            {item.savedAt
                              ? `${formatDocumentTime(item.savedAt)}`
                              : " -"}
                          </p>
                          <div className="document_result_actions">
                            <button
                              type="button"
                              className="document_action_button"
                              onClick={() => openEditDocumentEditor(item)}
                            >
                              Edit
                            </button>
                            
                            <button
                              type="button"
                              className="document_action_button delete_button"
                              onClick={() => deleteDocument(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="document_editor_container">
                  <textarea
                    className="new_message_input document_large_textarea"
                    placeholder="Write your document..."
                    value={documentInput}
                    onChange={(e) => setDocumentInput(e.target.value)}
                  />
                  <div className="document_editor_bottom">
                    <button
                      type="button"
                      className="document_save_button"
                      onClick={saveDocument}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
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
