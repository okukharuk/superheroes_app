import { ObjectID } from "bson";
import express, { Request, Response } from "express";
import Superhero from "../models/superhero";
import { collections } from "../services/db.service";

export const superheroesRouter = express.Router();

superheroesRouter.use(express.json());

superheroesRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const superheroes = (await collections.superheroes?.find({}).toArray()) as Superhero[];

        res.status(200).send(superheroes);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

superheroesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectID(id) };
        const superhero = (await collections.superheroes?.findOne(query)) as Superhero;

        if (superhero) {
            res.status(200).send(superhero);
        }
    } catch (error: any) {
        res.status(404).send(`Unable to find matching superhero with id: ${req.params.id}`);
    }
});

superheroesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newSuperhero = req.body as Superhero;
        const result = await collections.superheroes?.insertOne(newSuperhero);

        result
            ? res.status(201).send(JSON.parse(`{"response": "Successfully created a new superhero with name ${newSuperhero.nickname}"}`))
            : res.status(500).send("Failed to create a new superhero.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

superheroesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedSuperhero: Superhero = req.body as Superhero;
        delete updatedSuperhero._id;
        const query = { _id: new ObjectID(id) };
        const result = await collections.superheroes?.updateOne(query, { $set: {...updatedSuperhero} });

        result
            ? res.status(200).send(JSON.parse(`Successfully updated superhero with id ${id}`))
            : res.status(304).send(`Superhero with id: ${id} not updated`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

superheroesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectID(id) };
        const result = await collections.superheroes?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed superhero with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove superhero with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Superhero with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});