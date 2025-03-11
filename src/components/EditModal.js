import { useState, useEffect } from "react";
import styled from "styled-components";

const EditModalContainer = styled.div`
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

function EditModal({ selectedCard, closeEditModal, updateCard }) {
    const [formData, setFormData] = useState({
        term: "",
        reading: "",
        definition: "",
    });

    // When the modal opens, populate the form with the selected card's data
    useEffect(() => {
        if (selectedCard) {
            setFormData({
                term: selectedCard.term,
                reading: selectedCard.reading,
                definition: selectedCard.definition,
            });
        }
    }, [selectedCard]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateCard(selectedCard.id, formData);
        closeEditModal();
    }

    return (
        <>
            <EditModalContainer>
                <form onSubmit={handleSubmit}>
                    <h2>Edit Card</h2>
                    <FormRow>
                        <label htmlFor="term">Term:</label>
                        <input
                            type="text"
                            name="term"
                            value={formData.term}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <label htmlFor="reading">Reading:</label>
                        <input
                            type="text"
                            name="reading"
                            value={formData.reading}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <label htmlFor="definition">Definition:</label>
                        <input
                            type="text"
                            name="definition"
                            value={formData.definition}
                            onChange={handleChange}
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeEditModal}>
                            Cancel
                        </button>
                    </FormRow>
                </form>
            </EditModalContainer>
        </>
    );
}

export default EditModal;
