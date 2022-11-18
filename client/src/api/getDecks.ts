import { TDeck } from "../types/Deck";
import { API_URL } from "./config";

export async function getDecks(): Promise<TDeck[]> {
    const res = await fetch(`${API_URL}/decks`);
    return res.json();
}
