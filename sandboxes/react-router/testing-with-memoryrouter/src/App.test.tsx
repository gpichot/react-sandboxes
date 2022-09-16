import React, { useReducer } from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import App from "./App";

describe("App", () => {
  it("renders homepage", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText("Homepage")).toBeVisible();
  });

  it("goes to tasks on click Tasks link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Tasks"));
    expect(screen.queryByText("Tasks")).toBeVisible();
  });
});
