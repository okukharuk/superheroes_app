import express from "express";
import path from "path";
import * as dotenv from "dotenv";
import { superheroesRouter } from "./routes/superheroes.router";
import { connectToDatabase } from "./services/db.service";

export const app = express();

export const launchDB = async() => {
    dotenv.config();
    const port = process.env.PORT || 8080; // default port to listen

    return await connectToDatabase()
        .then(() => {
            app.use(express.static(path.join(__dirname, '../client/build')));
            app.use('/api/superheroes', superheroesRouter)

            return app.listen(port, () => {
                console.log(`Server started at http://localhost:${port}`);
            });
        })
        .catch((error: Error) => {
            console.error("Database connection failed", error);
            process.exit();
        });
}