import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("teste case", () => {
  it("should test App component", async () => {
    render(<App />);

    screen.logTestingPlaygroundURL();

    expect(
      (
        await screen.findByText(
          "Click on the Vite and React logos to learn more"
        )
      ).textContent
    ).toBe("Click on the Vite and React logos to learn more");
  });
});
