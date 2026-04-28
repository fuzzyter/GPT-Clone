import { useContext, useEffect } from "react";
import { HelpAnchorsContext } from "./helpAnchorsContext.js";
import "./helpOverlay.css";

const SIDEBAR_WIDTH = 250;
const LEFT_GAP = 16;
const TOP_GAP = 72;
const BOTTOM_GAP = 18;
const STACK_GAP = 50;

const ANCHOR_COPY = {
  helpButton: "Help: shows short tips for controls.",
  settingsButton: "Settings: opens preferences.",
  searchButton:
    "Search: finds conversations that contain your keyword.",
  bookmarksButton:
    "Bookmarks: lists messages you bookmarked and jumps to them.",
  documentsButton:
    "Documents: save documents for reuse in prompts.",
  newChat:
    "New Chat: opens a fresh draft. Messages create a conversation once you send.",
  conversations:
    "Conversation row: loads that thread in the main area so you can keep chatting.",
  deleteAll:
    "Delete conversations: clears every saved thread from this browser.",
  chatLogo:
    "Empty state: no chat is open. Use New Chat or pick a conversation to start.",
  messages:
    "Message list: shows the current conversation.",
  composer:
    "Composer: type a prompt. Enter= sends, Shift+Enter= adds a line. Send icon also works.",
};

const LEFT_START = SIDEBAR_WIDTH + LEFT_GAP;

function HelpOverlay() {
  const ctx = useContext(HelpAnchorsContext);
  if (!ctx) return null;

  const { isHelpOpen, closeHelp } = ctx;

  useEffect(() => {
    if (!isHelpOpen) return;
    const onKey = () => closeHelp();
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isHelpOpen, closeHelp]);

  if (!isHelpOpen) return null;

  const callouts = [
    { id: "helpButton", text: ANCHOR_COPY.helpButton, style: { top: TOP_GAP, right: 16 } },
    { id: "settingsButton", text: ANCHOR_COPY.settingsButton, style: { top: TOP_GAP + STACK_GAP, right: 16 } },
    { id: "deleteAll", text: ANCHOR_COPY.deleteAll, style: { bottom: BOTTOM_GAP, left: LEFT_START } },
    { id: "bookmarksButton", text: ANCHOR_COPY.bookmarksButton, style: { bottom: BOTTOM_GAP + STACK_GAP, left: LEFT_START } },
    { id: "documentsButton", text: ANCHOR_COPY.documentsButton, style: { bottom: BOTTOM_GAP + STACK_GAP * 2, left: LEFT_START } },
    { id: "searchButton", text: ANCHOR_COPY.searchButton, style: { top: TOP_GAP, left: LEFT_START } },
    { id: "newChat", text: ANCHOR_COPY.newChat, style: { top: TOP_GAP + STACK_GAP, left: LEFT_START } },
    { id: "conversations", text: ANCHOR_COPY.conversations, style: { top: TOP_GAP + STACK_GAP * 2, left: LEFT_START } },
    { id: "chatLogo", text: ANCHOR_COPY.chatLogo, style: { top: "42%", left: "50%", transform: "translate(-50%, -50%)" } },
    { id: "messages", text: ANCHOR_COPY.messages, style: { top: "58%", left: "50%", transform: "translate(-50%, -50%)" } },
    { id: "composer", text: ANCHOR_COPY.composer, style: { right: 20, bottom: 20 } },
  ];

  return (
    <div
      className="help_overlay_backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Help"
      onClick={closeHelp}
    >
      <p className="help_overlay_hint">
        Click anywhere or press any key to close this help overlay.
      </p>
      {callouts.map(({ id, text, style }) => (
        <div
          key={id}
          className="help_overlay_callout"
          style={style}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default HelpOverlay;
