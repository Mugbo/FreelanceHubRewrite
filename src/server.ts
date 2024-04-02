import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  // Initialize Payload with the express instance
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  // Handle requests to /admin with Payload
  // It's crucial to do this before defining the catch-all Next.js handler
//   app.use('/admin', (req, res, next) => {
//     // Since you're facing issues with both Payload and Next.js handling,
//     // you might need custom logic here or simply pass through to ensure
//     // Payload can handle its admin paths. This might involve configuring
//     // Payload explicitly to handle its admin routes or ensuring that
//     // requests to /admin are not intercepted by Next.js unnecessarily.
//     // This placeholder demonstrates where such logic would be placed.
//     // If Payload's admin is fully self-contained and configured to use
//     // /admin, you might not need additional logic here.
//     next(); // Pass control to the next handler, which might be Payload's internal middleware
//   });

  // Ensure Next.js handles all other routes
  app.get('*', (req, res) => nextHandler(req, res));

  await nextApp.prepare();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((error) => console.error("Failed to start Payload CMS:", error));
