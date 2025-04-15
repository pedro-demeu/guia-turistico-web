import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardViewPage } from "..";

describe("Dashboard View Page", () => {
  it("should test Dashboard component", async () => {
    render(<DashboardViewPage />);

    screen.logTestingPlaygroundURL();

    expect((await screen.findByText("Guia Turístico")).textContent).toBe(
      "Guia Turístico"
    );
  });
});
