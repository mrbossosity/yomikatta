import { createContext, useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Main from "./components/Main";

const AppContainer = styled.div`
    background-color: #181818;
    color: #bbb;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

// Context to make decks and deck states global
export const DeckContext = createContext();

function App() {
    const [deck, setDeck] = useState(
        localStorage.getItem("userDeck")
            ? JSON.parse(localStorage.getItem("userDeck"))
            : []
    );
    const [deckScreen, setDeckScreen] = useState(true);
    const [playScreen, setPlayScreen] = useState(false);
    const [shuffledDeck, setShuffledDeck] = useState(deck);

    function shuffleCards() {
        const deckCopy = [...deck];

        // Fisher-Yates random shuffle
        for (let i = deckCopy.length - 1; i > 0; i--) {
            // Generate random index
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j
            const temp = deckCopy[i];
            deckCopy[i] = deckCopy[j];
            deckCopy[j] = temp;
        }

        setShuffledDeck(deckCopy);
    }

    function deckSelect() {
        setDeckScreen(true);
        setPlayScreen(false);
    }

    function playSelect() {
        if (deck.length < 1) {
            alert("Your deck is empty! Add some cards first.");
            return;
        }
        setDeckScreen(false);
        setPlayScreen(true);
        shuffleCards();
    }

    return (
        <AppContainer>
            <Header deckSelect={deckSelect} playSelect={playSelect} />
            <DeckContext.Provider
                value={{ deck, setDeck, shuffledDeck, setShuffledDeck }}
            >
                <Main deckScreen={deckScreen} playScreen={playScreen} />
            </DeckContext.Provider>
        </AppContainer>
    );
}

export default App;
