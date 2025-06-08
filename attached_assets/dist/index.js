var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// db/index.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contacts: () => contacts,
  insertContactSchema: () => insertContactSchema,
  insertSubscriberSchema: () => insertSubscriberSchema,
  insertUserSchema: () => insertUserSchema,
  subscribers: () => subscribers,
  users: () => users
});
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true
});
var subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  interests: text("interests"),
  preferredLanguage: text("preferred_language").default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
  name: true,
  interests: true,
  preferredLanguage: true
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  company: text("company"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  responded: boolean("responded").default(false)
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true,
  company: true,
  phone: true
});

// db/index.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/routes.ts
import { z } from "zod";
import { eq } from "drizzle-orm";
import path from "path";
import express from "express";
async function registerRoutes(app2) {
  app2.use(express.static(path.join(process.cwd(), "public")));
  app2.use("/attached_assets", express.static(path.join(process.cwd(), "attached_assets")));
  const apiPrefix = "/api";
  app2.get(`${apiPrefix}/subscribers`, async (req, res) => {
    try {
      const subscribers2 = await db.query.subscribers.findMany();
      return res.status(200).json(subscribers2);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });
  app2.post(`${apiPrefix}/subscribers`, async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const [newSubscriber] = await db.insert(subscribers).values(validatedData).returning();
      return res.status(201).json(newSubscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error adding subscriber:", error);
      return res.status(500).json({ error: "Failed to add subscriber" });
    }
  });
  app2.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const [newContact] = await db.insert(contacts).values(validatedData).returning();
      return res.status(201).json(newContact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ error: "Failed to submit contact form" });
    }
  });
  app2.get(`${apiPrefix}/users`, async (req, res) => {
    try {
      const users2 = await db.query.users.findMany({
        columns: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          createdAt: true
          // Exclude password for security
        }
      });
      return res.status(200).json(users2);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.put(`${apiPrefix}/subscribers/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid subscriber ID" });
      }
      const updateSchema = insertSubscriberSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const [updatedSubscriber] = await db.update(subscribers).set(validatedData).where(eq(subscribers.id, id)).returning();
      if (!updatedSubscriber) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
      return res.status(200).json(updatedSubscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error updating subscriber:", error);
      return res.status(500).json({ error: "Failed to update subscriber" });
    }
  });
  app2.delete(`${apiPrefix}/subscribers/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid subscriber ID" });
      }
      const [deletedSubscriber] = await db.delete(subscribers).where(eq(subscribers.id, id)).returning();
      if (!deletedSubscriber) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
      return res.status(200).json({ message: "Subscriber deleted successfully" });
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      return res.status(500).json({ error: "Failed to delete subscriber" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@db": path2.resolve(import.meta.dirname, "db"),
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
