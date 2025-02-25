import { useState, useContext, useEffect } from "react";
import { DeckContext } from "../App";
import styled from "styled-components";

import Flashcard from "./Flashcard";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const DeckContainer = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
    grid-gap: 1rem;
`;

const AddCardButton = styled.button`
    display: inline-block;
    padding: 1rem;
    border: 1px dashed #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #181818;
    color: #bbb;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
        color: dodgerblue;
        border: 1px dashed dodgerblue;
    }
`;

function Deck() {
    const { deck, setDeck } = useContext(DeckContext);

    // Save deck to local storage whenever deck changes
    useEffect(() => {
        localStorage.setItem("userDeck", JSON.stringify(deck));
    }, [deck]);

    // Edit modal functionality
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function openEditModal(card) {
        setSelectedCard(card);
        setIsEditModalOpen(true);
    }

    function closeEditModal() {
        setIsEditModalOpen(false);
        setSelectedCard(null);
    }

    function updateCard(id, data) {
        let newDeck = [...deck];
        let cardToUpdate = newDeck.find((card) => card.id === id);
        cardToUpdate.term = data.term;
        cardToUpdate.reading = data.reading;
        cardToUpdate.definition = data.definition;
        setDeck(newDeck);
    }

    // Add modal functionality
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    function openAddModal() {
        setIsAddModalOpen(true);
    }

    function closeAddModal() {
        setIsAddModalOpen(false);
    }

    function saveNewCard(newCard) {
        let newDeck = [...deck];
        newDeck.push(newCard);
        setDeck(newDeck);
    }

    // Delete card functionality
    function deleteCard(id) {
        if (window.confirm("Are you sure you want to delete this card?")) {
            setDeck((prevDeck) => prevDeck.filter((card) => card.id !== id));
        }
    }

    return (
        <>
            {isEditModalOpen && (
                <EditModal
                    selectedCard={selectedCard}
                    closeEditModal={closeEditModal}
                    updateCard={updateCard}
                />
            )}

            {isAddModalOpen && (
                <AddModal
                    saveNewCard={saveNewCard}
                    closeAddModal={closeAddModal}
                />
            )}
            <DeckContainer>
                <AddCardButton onClick={openAddModal}>+ New</AddCardButton>
                {deck.map((card, index) => (
                    <Flashcard
                        key={card.id}
                        card={card}
                        openEditModal={openEditModal}
                        deleteCard={deleteCard}
                    />
                ))}
            </DeckContainer>
        </>
    );
}

export default Deck;
