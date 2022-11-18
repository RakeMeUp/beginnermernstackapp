import { TDeck } from "../types/Deck";
import { API_URL } from "./config";

export async function createCard(deckId: string, text: string): Promise<TDeck> {
    const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    });
    return res.json();
}
