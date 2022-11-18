import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard } from "../api/createCard";
import { deleteCard } from "../api/deleteCard";
import { getDeck } from "../api/getDeck";
import { TDeck } from "../types/Deck";

type Props = {};

const Deck = (props: Props) => {
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [text, setText] = useState("");
    const [cards, setCards] = useState<string[]>([]);
    let { deckId } = useParams();

    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        const { cards: serverCards } = await createCard(deckId!, text);
        setCards(serverCards);
        setText("");
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return;
        const newDeck = await deleteCard(deckId, index);
        setCards(newDeck.cards);
    }

    useEffect(() => {
        const fetchDeck = async () => {
            if (!deckId) return;
            const newDeck = await getDeck(deckId);
            setDeck(newDeck);
            setCards(newDeck.cards);
        };
        fetchDeck();
    }, [deckId]);

    return (
        <div>
            <h2>Cards</h2>
            <ul className="decks">
                {cards.map((card, i) => (
                    <li key={i}>
                        {card}
                        <button onClick={() => handleDeleteCard(i)}>X</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateCard}>
                <label htmlFor="card-title">Card Title</label>
                <input
                    id="card-title"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setText(e.target.value);
                    }}
                    value={text}
                />
                <button>Create Card</button>
            </form>
        </div>
    );
};

export default Deck;
