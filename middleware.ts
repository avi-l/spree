// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//   publicRoutes: ["/api/:path*"],
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware } from "@clerk/nextjs";

const isDevelopment = true;
// const isDevelopment = process.env.NODE_ENV === "development";

// Conditionally apply authMiddleware based on environment
const middleware = isDevelopment
  ? (req: any, res: any, next: () => any) => next()
  : authMiddleware({
      publicRoutes: ["/api/:path*"],
    });

export default middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
