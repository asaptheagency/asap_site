import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Seed users
    const users = [
      {
        username: "admin",
        password: "$2a$10$dYVycH46Z3F7JxWn3KgZkOfbKR5OhpEi0kGZP36tNIcx2oOZUQwhO", // hashed "adminpassword"
        email: "admin@eonix.com",
        fullName: "Admin User"
      },
      {
        username: "demo",
        password: "$2a$10$nRHjNJSCH8sLwpDVczh5guscB7IELZzH53dsyjKSEBnrXQNdNLsS2", // hashed "demopassword"
        email: "demo@eonix.com",
        fullName: "Demo User"
      }
    ];

    console.log("Seeding users...");
    for (const user of users) {
      const exists = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, user.username)
      });

      if (!exists) {
        await db.insert(schema.users).values(user);
        console.log(`Created user: ${user.username}`);
      } else {
        console.log(`User ${user.username} already exists`);
      }
    }

    // Seed some initial subscribers
    const subscribers = [
      {
        email: "john.doe@example.com",
        name: "John Doe",
        interests: "electric vehicles",
        preferredLanguage: "en"
      },
      {
        email: "jane.smith@example.com",
        name: "Jane Smith",
        interests: "grid storage",
        preferredLanguage: "en"
      },
      {
        email: "carlos.rodriguez@example.com",
        name: "Carlos Rodriguez",
        interests: "portable devices",
        preferredLanguage: "es"
      }
    ];

    console.log("Seeding subscribers...");
    for (const subscriber of subscribers) {
      const exists = await db.query.subscribers.findFirst({
        where: (subscribers, { eq }) => eq(subscribers.email, subscriber.email)
      });

      if (!exists) {
        await db.insert(schema.subscribers).values(subscriber);
        console.log(`Created subscriber: ${subscriber.email}`);
      } else {
        console.log(`Subscriber ${subscriber.email} already exists`);
      }
    }

    // Sample contact submissions
    const contacts = [
      {
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        message: "I'm interested in learning more about your battery technology for my research project.",
        company: "University Research Lab",
        phone: "555-123-4567"
      },
      {
        name: "Lisa Chen",
        email: "lisa.chen@example.com",
        message: "Our company is exploring battery options for our new electric vehicle line. Would like to discuss partnership opportunities.",
        company: "Green Motors Inc.",
        phone: "555-987-6543"
      }
    ];

    console.log("Seeding contacts...");
    for (const contact of contacts) {
      const exists = await db.query.contacts.findFirst({
        where: (contacts, { eq }) => eq(contacts.email, contact.email)
      });

      if (!exists) {
        await db.insert(schema.contacts).values(contact);
        console.log(`Created contact: ${contact.email}`);
      } else {
        console.log(`Contact ${contact.email} already exists`);
      }
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
