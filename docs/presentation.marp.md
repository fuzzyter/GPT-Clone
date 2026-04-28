---
marp: true
size: 4:3
paginate: true
title: MyGPT Individual Project
---

# MyGPT

ASE 285 Individual Project

Naeun Kim

---

## Project Summary

MyGPT is a chatbot application based on a ChatGPT clone prototype.
It uses the OpenAI API.

The goal is to make the chatbot easier and more comfortable to use.

---

## Problem

Users who are not familiar with LLM tools can have trouble using a chatbot.

The original prototype did not have many user convenience features.

That problems can make users leave the service.

---

## Solution

MyGPT adds features for user support and convenience:

- Help
- UI settings
- Search
- Bookmarks
- Documents

---

## Planned Features

| Feature | Status |
|---|---|
| Help | Complete |
| UI Improvement | Complete |
| Search | Complete |
| Bookmarks | Complete |
| Documents | Complete |

---

## Requirements

| ID | Requirement |
|---|---|
| R1 | Help users understand how to use the app. |
| R2 | Improve readability. |
| R3 | Let users change UI style. |
| R4 | Let users search old conversations. |
| R5 | Let users collect favorite answers. |
| R6 | Let users reuse documents in prompts. |

---

## Sprint 1

Planned:

- Help
- UI improvement

Implemented:

- Help overlay
- UI style changes

---

## Sprint 2

Planned:

- Search
- Bookmarks
- Documents

Implemented:

- Settings page
- Collapsible sidebar
- Search
- Bookmarks
- Documents
- Conversation title editing

---

## Feature: Help

The help overlay shows short guide text for controls.

It helps new users understand the app.

---

## Feature: Search

Users can search previous conversations by keyword.

They can open a matching conversation from the result list.

---

## Feature: Bookmarks

Users can bookmark useful messages.

The Bookmarks page shows all bookmarked messages in one place.

---

## Feature: Documents

Users can save reusable document text.

They can select saved documents and include them in a prompt.

---

## Architecture

```text
React UI
  -> Redux Store
  -> OpenAI Service
  -> OpenAI API
```

Data is saved in localStorage.

---

## Metrics

| Metric | Value |
|---|---|
| Planned Features | 5 |
| Completed Features | 5 |
| Feature Completion | 100% |
| Requirements | 6 |
| Finished Requirements | 6 |

---

## What Went Well

- The project direction became clear.
- The UI became easier to use.
- Main user convenience features were implemented.

---

## What Was Difficult

- Understanding the original prototype took time.
- OpenAI API exeeded.
- Balancing UI changes and feature logic was challenging.

---

## Future Work

- Add cloud database support.
- Improve mobile layout.
- Add more customizing features.


---

## Conclusion

MyGPT improves the original chatbot prototype with features that help users use the app more easily.

It focuses on simple design, saved information, and user convenience.
