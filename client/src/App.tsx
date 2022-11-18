import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import "./App.css";
import { TDeck } from "./types/Deck";

function App() {
    const [title, setTitle] = useState("");
    const [decks, setDecks] = useState([] as TDeck[]);

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const deck = await createDeck(title);
        setDecks([...decks, deck]);
        setTitle("");
    }

    async function handleDeleteCard(deckId: string) {
        await deleteDeck(deckId);
        //OPTIMISTIC UPDATE
        setDecks(decks.filter((deck) => deck._id !== deckId));
    }

    useEffect(() => {
        const fetchDecks = async () => {
            const newDecks = await getDecks();
            setDecks(newDecks);
        };
        fetchDecks();
    }, []);

    return (
        <div className="App">
            <h2>Decks</h2>
            <ul className="decks">
                {decks.map((deck) => (
                    <Link key={deck._id} to={`decks/${deck._id}`}>
                        <li>
                            <button onClick={() => handleDeleteCard(deck._id)}>X</button>

                            {deck.title}
                        </li>
                    </Link>
                ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="deck-title">Deck Title</label>
                <input
                    id="deck-title"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                />
                <button>Create Deck</button>
            </form>
        </div>
    );
}

export default App;
