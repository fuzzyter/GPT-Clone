# MyGPT Requirements

## Project Summary

MyGPT is a simple chatbot application based on a ChatGPT clone prototype. It uses the OpenAI API and adds features that help users use the chatbot in a more comfortable way.

## Problem

Users who are not familiar with LLM tools can have trouble using a chatbot. The original prototype also did not have many user convenience features. This can make users leave the service.

## Solution

MyGPT adds help, search, bookmarks, documents, and UI settings. These features help users understand the app, find old information, save useful answers, and reuse long text in prompts.

## Features and Requirements

| Feature ID | Feature | Requirement ID | Requirement |
|---|---|---|---|
| F1 | Help | R1 | The user can get help when they are confused about how to use the app. |
| F2 | UI Improvement | R2 | The user can read and use the service with better visual clarity. |
| F2 | UI Improvement | R3 | The user can change the UI style to fit their preference. |
| F3 | Search | R4 | The user can find needed information from previous conversations quickly. |
| F4 | Bookmarks | R5 | The user can collect favorite or useful answers in one place. |
| F5 | Documents | R6 | The user can reuse one document in many conversations without typing it again. |

## Acceptance Criteria

### F1. Help

- The app has a help button.
- When the user clicks the help button, guide text appears on the screen.
- The user can close the help overlay by clicking or pressing a key.

### F2. UI Improvement

- The app has a cleaner layout than the original prototype.
- The user can change font size in the settings page.
- The selected font size is saved and reused later.
- The user can open and close the sidebar.

### F3. Search

- The app has a search page.
- The user can type a keyword and search previous conversations.
- The app shows conversations that include the keyword.
- The user can open a conversation from the search result.

### F4. Bookmarks

- The user can bookmark a message.
- The user can remove a bookmark from a message.
- The app has a bookmark page.
- The user can open a bookmarked message from the bookmark page.

### F5. Documents

- The user can create a saved document.
- The user can edit and delete a saved document.
- The user can select saved documents from the message input.
- The selected document text is included with the prompt sent to the AI.


## Feature Completion

| Metric | Value |
|---|---|
| Planned Features Count | 5 |
| Completed Features Count | 5 |
| Feature Completion | 5/5 = 100% |
| Requirements Count | 6 |
| Finished Requirements Count | 6/6 = 100% |
