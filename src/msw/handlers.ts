import { http, HttpResponse } from "msw";
import { STATUS } from "../pages/DashboardViewPage/dashboard.types";

export const handlers = [
  http.get("http://localhost:8000/api/getStatus", () => {
    return HttpResponse.json({
      isActive: STATUS.ACTIVE,
    });
  }),
  http.get("http://localhost:8084/v1/tourist-spots", () => {
    return HttpResponse.json([]);
  }),
];
