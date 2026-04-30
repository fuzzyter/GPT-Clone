import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import dashboardReducer from "../../src/src/Dashboard/dashboardSlice.js";

export function createTestStore(preloadedDashboardState = {}) {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
    },
    preloadedState: {
      dashboard: {
        conversations: [],
        selectedConversationId: null,
        loading: false,
        error: null,
        ...preloadedDashboardState,
      },
    },
  });
}

export function renderWithStore(ui, preloadedDashboardState) {
  const store = createTestStore(preloadedDashboardState);

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}
