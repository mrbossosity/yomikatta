import { useState } from "react";
import styled from "styled-components";
import { uid } from "uid";

const AddModalContainer = styled.div`
    background: #eee;
    position: absolute;
    left: 0;
    right: 0;
    margin-inline: auto;
    width: fit-content;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0.5rem 4rem #181818;
    color: #181818;

    & div {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
    }
`;

const FormRow = styled.div`
    display: flex;
    gap: 0.5rem;

    & label,
    input {
        font-size: 1rem;
    }
`;

function AddModal({ saveNewCard, closeAddModal }) {
    const [newCard, setNewCard] = useState({
        id: uid(16),
        term: "",
        reading: "",
        definition: "",
        suspended: false,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setNewCard((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        saveNewCard(newCard);
        closeAddModal();
    }

    return (
        <>
            <AddModalContainer>
                <form onSubmit={handleSubmit}>
                    <h2>New Card</h2>
                    <FormRow>
                        <label for="term">Term:</label>
                        <input
                            type="text"
                            name="term"
                            value={newCard.term}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <label for="reading">Reading:</label>
                        <input
                            type="text"
                            name="reading"
                            value={newCard.reading}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <label for="definition">Definition:</label>
                        <input
                            type="text"
                            name="definition"
                            value={newCard.definition}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeAddModal}>
                            Cancel
                        </button>
                    </FormRow>
                </form>
            </AddModalContainer>
        </>
    );
}

export default AddModal;
