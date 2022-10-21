import cors from "cors";
import express from "express";
import { superheroesRouter } from "./routes/superheroes.router";
import { connectToDatabase } from "./services/db.service";

export const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const launchDB = async() => {
    const port = 8080; // default port to listen

    return await connectToDatabase()
        .then(() => {
            app.use("/api/superheroes", cors(corsOptions) ,superheroesRouter);

            return app.listen(port, () => {
                console.log(`Server started at http://localhost:${port}`);
            });
        })
        .catch((error: Error) => {
            console.error("Database connection failed", error);
            process.exit();
        });
}