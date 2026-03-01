import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { HelpAnchorsContext } from "./helpAnchorsContext.js";
import "./helpOverlay.css";

const CALLOUT_MAX_W = 260;
const VIEWPORT_PADDING = 10;
const HINT_SAFE_TOP = 56;

const ANCHOR_COPY = {
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
    "Composer: type a prompt. Enter sends, Shift+Enter adds a line. Send icon also works.",
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function estimateCalloutHeight(text, width) {
  const approxCharsPerLine = Math.max(20, Math.floor(width / 7));
  const lineCount = Math.ceil(text.length / approxCharsPerLine);
  return 20 + lineCount * 20;
}

function intersects(a, b) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

function buildBox(left, top, width, height) {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}

function placeWithoutOverlap(anchorRect, text, takenRects) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const width = Math.min(CALLOUT_MAX_W, viewportWidth - VIEWPORT_PADDING * 2);
  const height = estimateCalloutHeight(text, width);
  const minTop = HINT_SAFE_TOP;

  const candidates = [
    {
      left: anchorRect.right + VIEWPORT_PADDING,
      top: anchorRect.top,
    },
    {
      left: anchorRect.left - width - VIEWPORT_PADDING,
      top: anchorRect.top,
    },
    {
      left: anchorRect.left,
      top: anchorRect.bottom + VIEWPORT_PADDING,
    },
    {
      left: anchorRect.left,
      top: anchorRect.top - height - VIEWPORT_PADDING,
    },
  ];

  for (const candidate of candidates) {
    const safeLeft = clamp(
      candidate.left,
      VIEWPORT_PADDING,
      viewportWidth - width - VIEWPORT_PADDING
    );
    const safeTop = clamp(
      candidate.top,
      minTop,
      viewportHeight - height - VIEWPORT_PADDING
    );
    const candidateBox = buildBox(safeLeft, safeTop, width, height);
    const blocked = takenRects.some((taken) => intersects(candidateBox, taken));
    if (!blocked) {
      return { left: safeLeft, top: safeTop, width, height };
    }
  }

  for (let top = minTop; top <= viewportHeight - height - VIEWPORT_PADDING; top += 8) {
    for (
      let left = VIEWPORT_PADDING;
      left <= viewportWidth - width - VIEWPORT_PADDING;
      left += 12
    ) {
      const candidateBox = buildBox(left, top, width, height);
      const blocked = takenRects.some((taken) => intersects(candidateBox, taken));
      if (!blocked) {
        return { left, top, width, height };
      }
    }
  }

  return {
    left: VIEWPORT_PADDING,
    top: minTop,
    width,
    height,
  };
}

function HelpOverlay() {
  const ctx = useContext(HelpAnchorsContext);
  const [layouts, setLayouts] = useState([]);
  if (!ctx) return null;

  const { anchorsRef, revision, isHelpOpen, closeHelp } = ctx;

  useEffect(() => {
    if (!isHelpOpen) return;
    const onKey = () => closeHelp();
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isHelpOpen, closeHelp]);

  const measure = () => {
    if (!anchorsRef) return;
    const next = [];
    const map = anchorsRef.current;
    const takenRects = [
      {
        left: VIEWPORT_PADDING,
        top: 0,
        right: window.innerWidth - VIEWPORT_PADDING,
        bottom: HINT_SAFE_TOP,
      },
    ];

    for (const [id, el] of Object.entries(map)) {
      if (!el?.isConnected) continue;
      const text = ANCHOR_COPY[id];
      if (!text) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const pos = placeWithoutOverlap(r, text, takenRects);
      const calloutRect = buildBox(pos.left, pos.top, pos.width, pos.height);
      takenRects.push(calloutRect);
      next.push({
        id,
        text,
        left: pos.left,
        top: pos.top,
        maxWidth: pos.width,
      });
    }
    setLayouts(next);
  };

  useLayoutEffect(() => {
    if (!isHelpOpen || !anchorsRef) return;
    measure();
  }, [isHelpOpen, revision, anchorsRef]);

  useEffect(() => {
    if (!isHelpOpen || !anchorsRef) return;
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [isHelpOpen, anchorsRef]);

  if (!isHelpOpen) return null;

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
      {layouts.map(({ id, text, left, top, maxWidth }) => (
        <div
          key={id}
          className="help_overlay_callout"
          style={{ left, top, maxWidth }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default HelpOverlay;
