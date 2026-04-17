import { httpRouter } from "convex/server";

const http = httpRouter();

// HTTP router configured for Convex deployment.
// Clerk JWT validation is handled through convex/auth.config.ts.

export default http;
