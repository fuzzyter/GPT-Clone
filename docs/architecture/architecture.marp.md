---
marp: true
size: 4:3
paginate: true
title: MyGPT Design and Architecture
---

# MyGPT Design and Architecture

ASE 285 Individual Project

---

## Project Overview

MyGPT is a React and Electron chatbot application.

It uses the OpenAI API for AI responses.

It stores user data in localStorage.

---

## Main Goal

The goal is to improve a ChatGPT clone prototype.

The app adds user-friendly features:

- Help
- UI settings
- Search
- Bookmarks
- Documents
- Conversation title editing

---

## High-Level Architecture

```text
User
  |
  v
React UI
  |
  v
Redux Store
  |
  v
OpenAI Service
  |
  v
OpenAI API
```

---

## Main Folders

```text
src/
  src/
    Dashboard/
      Chat/
      Help/
      Sidebar/
      dashboardSlice.js
      Dashboard.jsx
    services/
      openaiService.js
```

---

## React UI Layer

The React UI handles the screens and user actions.

Important parts:

- `Dashboard.jsx`: main app screen and feature pages
- `Sidebar.jsx`: conversation list and sidebar buttons
- `Chat.jsx`: chat area
- `NewMessageInput.jsx`: message input and document picker
- `HelpOverlay.jsx`: help guide overlay

---

## State Management

Main state:

- conversations
- selected conversation ID
- loading state
- error state

---

## OpenAI API Flow

1. The user writes a prompt.
2. The app creates a user message.
3. The app adds selected document text if needed.
4. `sendConversationMessage` sends the prompt to `openaiService`.
5. The OpenAI response is added to the conversation.
6. The conversation is saved in localStorage.

---

## Document Flow

Documents are saved in localStorage.

The user can add, edit, delete, and select documents.

When documents are selected, their text is added to the prompt as reference context.

---

## Bookmark Flow

Each message can have a `bookmarked` value.

When the user clicks the bookmark button, the app toggles this value.

The Bookmarks page collects bookmarked messages from all conversations.

---

## Search Flow

The search page checks saved conversations.

It compares the keyword with message text.

Matching conversations are shown as results.

The user can open a conversation from the result list.

---

## Data Model

```text
Conversation
  id
  title
  messages[]

Message
  id
  content
  aiMessage
  bookmarked

Document
  id
  content
  savedAt
```

---

## Local Storage Keys

- `conversations`
- `documents`
- `uiFontSize`

---

## Design

The app keeps the design simple.
Most features are in the dashboard area because they are user-facing chat features.

---

## Future Improvements

- Add cloud database support.
- Improve mobile layout.
- Add more customizing features.
