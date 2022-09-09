import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("has counter initial value to zero", () => {
    render(<App />);
    expect(screen.getByLabelText("Count")).toHaveTextContent("0");
  });

  it("displays hellow world", () => {
    render(<App />);
    expect(screen.getByText("Hello world")).toBeVisible();
  });

  it("increment counter on click", async () => {
    const user = userEvent.setup();

    render(<App />);

    // screen.logTestingPlaygroundURL();

    await user.click(screen.getByText("Increment"));

    expect(screen.getByLabelText("Count")).toHaveTextContent("1");
  });
});
