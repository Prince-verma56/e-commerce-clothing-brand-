const clerkIssuer = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!clerkIssuer) {
  throw new Error("CLERK_JWT_ISSUER_DOMAIN is required for Convex auth.");
}

export default {
  providers: [
    {
      domain: clerkIssuer,
      applicationID: "convex",
    },
  ],
};
