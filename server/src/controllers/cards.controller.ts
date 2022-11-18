import { Request, Response } from "express";
import { DeckModel } from "../models/Deck";

export const createCard = async (req: Request, res: Response) => {
    const deckId = req.params.deckId;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send("no deck like that");
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    res.json(deck);
};

export async function deleteCard(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send("no deck like that");
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    res.json(deck);
}
