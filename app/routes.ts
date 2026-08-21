import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("cancellation-policy", "routes/cancellation-policy.tsx"),
  route("security", "routes/security.tsx"),
] satisfies RouteConfig;
