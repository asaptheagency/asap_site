import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import * as schema from "@shared/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from public directory
  app.use(express.static(path.join(process.cwd(), 'public')));
  
  // Serve attached assets directly (higher priority)
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  // API prefix
  const apiPrefix = "/api";

  // GET /api/subscribers - Get all subscribers
  app.get(`${apiPrefix}/subscribers`, async (req, res) => {
    try {
      const subscribers = await db.query.subscribers.findMany();
      return res.status(200).json(subscribers);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
  });

  // POST /api/subscribers - Add a new subscriber
  app.post(`${apiPrefix}/subscribers`, async (req, res) => {
    try {
      const validatedData = schema.insertSubscriberSchema.parse(req.body);
      const [newSubscriber] = await db.insert(schema.subscribers).values(validatedData).returning();
      return res.status(201).json(newSubscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Error adding subscriber:', error);
      return res.status(500).json({ error: 'Failed to add subscriber' });
    }
  });

  // POST /api/contact - Submit a contact form
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const validatedData = schema.insertContactSchema.parse(req.body);
      const [newContact] = await db.insert(schema.contacts).values(validatedData).returning();
      return res.status(201).json(newContact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Error submitting contact form:', error);
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // GET /api/users - Get all users (protected, for admin use)
  app.get(`${apiPrefix}/users`, async (req, res) => {
    try {
      const users = await db.query.users.findMany({
        columns: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          createdAt: true,
          // Exclude password for security
        }
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // PUT /api/subscribers/:id - Update subscriber preferences
  app.put(`${apiPrefix}/subscribers/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid subscriber ID' });
      }

      const updateSchema = schema.insertSubscriberSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      
      const [updatedSubscriber] = await db
        .update(schema.subscribers)
        .set(validatedData)
        .where(eq(schema.subscribers.id, id))
        .returning();
      
      if (!updatedSubscriber) {
        return res.status(404).json({ error: 'Subscriber not found' });
      }
      
      return res.status(200).json(updatedSubscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Error updating subscriber:', error);
      return res.status(500).json({ error: 'Failed to update subscriber' });
    }
  });

  // DELETE /api/subscribers/:id - Delete a subscriber
  app.delete(`${apiPrefix}/subscribers/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid subscriber ID' });
      }
      
      const [deletedSubscriber] = await db
        .delete(schema.subscribers)
        .where(eq(schema.subscribers.id, id))
        .returning();
      
      if (!deletedSubscriber) {
        return res.status(404).json({ error: 'Subscriber not found' });
      }
      
      return res.status(200).json({ message: 'Subscriber deleted successfully' });
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      return res.status(500).json({ error: 'Failed to delete subscriber' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
