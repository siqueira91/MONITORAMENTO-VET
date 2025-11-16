import { type Animal, type InsertAnimal } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAnimal(id: string): Promise<Animal | undefined>;
  getAllAnimals(): Promise<Animal[]>;
  createAnimal(animal: InsertAnimal): Promise<Animal>;
  updateAnimal(id: string, animal: InsertAnimal): Promise<Animal | undefined>;
  deleteAnimal(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private animals: Map<string, Animal>;

  constructor() {
    this.animals = new Map();
  }

  async getAnimal(id: string): Promise<Animal | undefined> {
    return this.animals.get(id);
  }

  async getAllAnimals(): Promise<Animal[]> {
    return Array.from(this.animals.values());
  }

  async createAnimal(insertAnimal: InsertAnimal): Promise<Animal> {
    const id = randomUUID();
    const animal: Animal = { ...insertAnimal, id };
    this.animals.set(id, animal);
    return animal;
  }

  async updateAnimal(id: string, insertAnimal: InsertAnimal): Promise<Animal | undefined> {
    const existing = this.animals.get(id);
    if (!existing) return undefined;
    
    const updated: Animal = { ...insertAnimal, id };
    this.animals.set(id, updated);
    return updated;
  }

  async deleteAnimal(id: string): Promise<boolean> {
    return this.animals.delete(id);
  }
}

export const storage = new MemStorage();
