import { TDeck } from "../types/Deck";
import { API_URL } from "./config";

export async function getDeck(deckId: string): Promise<TDeck> {
    const res = await fetch(`${API_URL}/decks/${deckId}`);
    return res.json();
}
