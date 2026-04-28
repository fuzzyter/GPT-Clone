# MyGPT

ASE 285 individual project

## Project Description

MyGPT is a simple chatbot application based on a ChatGPT clone. It uses the OpenAI API and adds user-friendly features so users can use the chatbot more easily.

The project focuses on simple UI, easy navigation, saved conversation data, search, bookmarks, documents, and help for new users.

## Problem

Users who are not familiar with LLM tools can have trouble using a chatbot. The original prototype also had few convenience features for users. This can make users leave the service, so the app needs changes that support different user needs.

## Solution

MyGPT adds a help overlay for users who are new to LLM. It also adds search and bookmark features so users can find old conversations and important answers quickly. Users can change the UI style, adjust font size, and save documents that can be reused in prompts.

## Main Features

1. Help
   - Shows short guide text for important controls.
   - Helps users understand how to use the app.

2. UI improvement
   - Improves the visual style and readability.
   - Adds settings for font size.
   - Adds a collapsible sidebar.

3. Search
   - Searches previous conversations by keyword.
   - Opens a matching conversation from the result list.

4. Bookmarks
   - Lets users bookmark useful messages.
   - Shows all bookmarked messages in one page.
   - Opens the conversation and scrolls to the bookmarked message.

5. Documents
   - Lets users save reusable text documents.
   - Lets users select saved documents and include them in a prompt.
   - Supports adding, editing, and deleting documents.


## Requirements

| ID | Requirement | Related Feature |
|---|---|---|
| R1 | The user can get help when they are confused about how to use the app. | Help |
| R2 | The user can read and use the service with better visual clarity. | UI improvement |
| R3 | The user can change the UI style to fit their preference. | UI improvement, Settings |
| R4 | The user can find needed information from previous conversations quickly. | Search |
| R5 | The user can collect favorite or useful answers in one place. | Bookmarks |
| R6 | The user can reuse one document in many conversations without typing it again. | Documents |

## Sprint Summary

### Sprint 1

Planned features:

- Help
- UI improvement

Planned requirements:

- R1
- R2

Implemented:

- Help overlay
- UI style changes

### Sprint 2

Planned features:

- Search
- Bookmarks
- Documents

Planned requirements:

- R3
- R4
- R5
- R6

Implemented:

- Settings page with font size control
- Collapsible sidebar
- Search page
- Bookmark feature
- Documents page
- Document input
- UI polish
- Conversation title editing

## Project Metrics

| Metric | Value |
|---|---|
| Planned Features Count | 5 |
| Completed Features Count | 5 |
| Feature Completion | 5/5 = 100% |
| Requirements Count | 6 |
| Finished Requirements Count | 6/6 = 100% |

## Technology Stack

- React
- Redux Toolkit
- Vite
- Electron
- OpenAI API
- localStorage

## Data Storage

This project stores user data in browser localStorage.

- `conversations`: saved chat conversations and bookmarked messages
- `documents`: saved reusable documents
- `uiFontSize`: selected font size

## How to Run

1. Go to the app folder.

```bash
cd src
```

2. Install dependencies.

```bash
npm install
```

3. Add an OpenAI API key to `.env` file.


4. Start the web app.

```bash
npm run dev
```

5. Start the Electron app.

```bash
npm run electron-dev
```



## Tests
