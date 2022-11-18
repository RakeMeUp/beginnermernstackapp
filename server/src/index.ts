import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createDeck, deleteDeck, getAllDecks, getDeck } from "./controllers/decks.controller";
import { createCard, deleteCard } from "./controllers/cards.controller";
dotenv.config();
const app = express();

const PORT = 5000;

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});
app.get("/decks", getAllDecks).post("/decks", createDeck);
app.get("/decks/:deckId", getDeck).delete("/decks/:deckId", deleteDeck);
app.post("/decks/:deckId/cards", createCard);
app.delete("/decks/:deckId/cards/:index", deleteCard);

const db = mongoose.connect(process.env.DB_URL!).then(() => {
    console.log(`listen port ${PORT}`);
});

app.listen(PORT);
