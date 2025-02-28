import { useState } from "react";
import styled from "styled-components";

const AnswerFieldContainer = styled.input.attrs((props) => ({
    type: "text",
}))`
    font-size: 2rem;
    padding: 1rem;
    background-color: #181818;
    border: 2px solid #aaa;
    border-radius: 8px;
    box-shadow: 0.2rem 0.2rem 2rem rgb(20, 20, 20) inset;
    color: #ccc;
    width: 20rem;
    text-align: center;
`;

function AnswerField({ ref, userInput, setUserInput, checkAnswer }) {
    function handleChange(e) {
        setUserInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        checkAnswer();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <AnswerFieldContainer
                    ref={ref}
                    value={userInput}
                    onChange={handleChange}
                    autoFocus
                />
            </form>
        </>
    );
}

export default AnswerField;
