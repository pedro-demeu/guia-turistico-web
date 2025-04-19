import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router";

import { DashboardViewPage, LoginViewPage } from "./pages";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route index element={<LoginViewPage />} />
        <Route path="/dashboard" element={<DashboardViewPage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
