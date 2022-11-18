import { Request, Response } from "express";
import { DeckModel } from "../models/Deck";

export async function getAllDecks(req: Request, res: Response) {
    const decks = await DeckModel.find();
    res.json(decks);
}

export async function deleteDeck(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deleted = await DeckModel.findByIdAndDelete(deckId);
    res.json(deleted);
}

export async function createDeck(req: Request, res: Response) {
    console.log(req.body);
    const newDeck = new DeckModel({ title: req.body.title });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}
export async function getDeck(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await DeckModel.findById(deckId);
    res.json(deck);
}
