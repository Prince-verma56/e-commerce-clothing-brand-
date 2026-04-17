import { httpRouter } from "convex/server";

const http = httpRouter();

// HTTP router configured for Convex deployment
// Note: After installing @convex-dev/auth with `npm install`, update this file
// to properly handle Clerk JWT token validation

export default http;
