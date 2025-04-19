import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardViewPage } from "..";
import App from "../../App";

describe("Dashboard View Page", () => {
  it("should test Dashboard component", async () => {
    render(<DashboardViewPage />);

    expect((await screen.findByText("Guia Turístico")).textContent).toBe(
      "Guia Turístico"
    );
  });

  describe("Tourist Spot API contracts", () => {
    it.only("either exist Tourist Spot created by User then should list them", async () => {
      // mock api calls
      render(<App />);

      expect((await screen.findByText("Praia do Futuro")).textContent).toBe(
        "Praia do Futuro"
      );
    });
    // it.only("should create a new tourist spot successful")
    // it.only("should allow to edit an existing tourist spot informations")
  });
});
