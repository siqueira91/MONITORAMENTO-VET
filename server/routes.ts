import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnimalSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all animals
  app.get("/api/animals", async (_req, res) => {
    try {
      const animals = await storage.getAllAnimals();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch animals" });
    }
  });

  // Get single animal
  app.get("/api/animals/:id", async (req, res) => {
    try {
      const animal = await storage.getAnimal(req.params.id);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch animal" });
    }
  });

  // Create new animal
  app.post("/api/animals", async (req, res) => {
    try {
      const result = insertAnimalSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const animal = await storage.createAnimal(result.data);
      res.status(201).json(animal);
    } catch (error) {
      res.status(500).json({ error: "Failed to create animal" });
    }
  });

  // Update animal
  app.put("/api/animals/:id", async (req, res) => {
    try {
      const result = insertAnimalSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }
      
      const animal = await storage.updateAnimal(req.params.id, result.data);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: "Failed to update animal" });
    }
  });

  // Delete animal
  app.delete("/api/animals/:id", async (req, res) => {
    try {
      const success = await storage.deleteAnimal(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Animal not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete animal" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
