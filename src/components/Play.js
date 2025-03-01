import { useState, useContext, useEffect, useRef } from "react";
import { DeckContext } from "../App";
import styled from "styled-components";
import AnswerField from "./AnswerField";
import BigButton from "./BigButton";

const PlayContainer = styled.div`
    color: #bbb;
    padding-top: 1rem;
    font-size: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const QuestionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Term = styled.div`
    font-size: 3.5rem;
    color: #ddd;
`;

const Reading = styled.div`
    font-size: 2.25rem;
    color: ${(props) => (props.$isCorrect ? "#ccc" : "indianred")};
`;

const Definition = styled.div`
    font-size: 2.25rem;
    color: #bbb;
`;

const AnswerContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
`;

const GradingButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

function Play() {
    const { shuffledDeck, setShuffledDeck } = useContext(DeckContext);
    const [currentCard, setCurrentCard] = useState(shuffledDeck[0]);

    const [questionPhase, setQuestionPhase] = useState(true);
    const inputRef = useRef(null);
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    function checkAnswer() {
        const userAnswer = userInput.trim();
        const realAnswer = currentCard.reading;

        if (userAnswer == realAnswer) {
            setQuestionPhase(false);
            setIsCorrect(true);
        }
    }

    function resetQuestion() {
        setQuestionPhase(true);
        setIsCorrect(false);
        setUserInput("");
    }

    function giveUp() {
        setQuestionPhase(false);
        setUserInput(currentCard.reading);
    }

    function skipCard() {
        // Push card to the back of the deck
        let temp = currentCard;
        let newDeck = shuffledDeck.slice(1);
        newDeck.push(temp);
        setShuffledDeck(newDeck);
        setCurrentCard(newDeck[0]);
        resetQuestion();
    }

    function gradeCard(targetIndex) {
        const newDeck = [...shuffledDeck];
        // Restrain targetIndex within valid array indices
        const validIndex = Math.min(targetIndex, newDeck.length - 1);
        // Store the first element
        const firstElement = newDeck[0];
        // Shift elements to the left
        for (let i = 0; i < validIndex; i++) {
            newDeck[i] = newDeck[i + 1];
        }
        // Place the first element at the target index
        newDeck[validIndex] = firstElement;

        setShuffledDeck(newDeck);
        setCurrentCard(newDeck[0]);
        resetQuestion();
    }

    function suspendCard() {
        let newDeck = shuffledDeck.filter((card) => card.id !== currentCard.id);
        if (newDeck.length < 1) {
            alert("No more cards!");
            return;
        }

        setShuffledDeck(newDeck);
        setCurrentCard(newDeck[0]);
        resetQuestion();
    }

    // Handles keydown event listeners for grading cards after question
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!questionPhase) {
                event.preventDefault();
                switch (event.key) {
                    case "1":
                        gradeCard(1);
                        break;
                    case "2":
                        gradeCard(4);
                        break;
                    case "3":
                        gradeCard(16);
                        break;
                    case "4":
                        gradeCard(64);
                        break;
                    case "0":
                        suspendCard();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up function to prevent leaks
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [questionPhase]);

    useEffect(() => {
        checkAnswer();
    }, [userInput]);

    return (
        <>
            <PlayContainer>
                <QuestionContainer>
                    <Term>{currentCard.term}</Term>
                    <Reading $isCorrect={isCorrect}>{userInput}</Reading>
                    {!questionPhase && (
                        <Definition>{currentCard.definition}</Definition>
                    )}
                </QuestionContainer>
                {questionPhase && (
                    <AnswerContainer>
                        <AnswerField
                            ref={inputRef}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            checkAnswer={checkAnswer}
                        />
                        <BigButton
                            onClick={giveUp}
                            text={"Give Up"}
                            hoverColor={"indianred"}
                        />
                        <BigButton
                            onClick={skipCard}
                            text={"Skip"}
                            hoverColor={"darkorange"}
                        />
                    </AnswerContainer>
                )}
                {!questionPhase && (
                    <GradingButtonsContainer>
                        <BigButton
                            onClick={() => gradeCard(1)}
                            text={"1 - Hard"}
                            hoverColor={"dodgerblue"}
                        />
                        <BigButton
                            onClick={() => gradeCard(4)}
                            text={"2 - Okay"}
                            hoverColor={"dodgerblue"}
                        />
                        <BigButton
                            onClick={() => gradeCard(16)}
                            text={"3 - Easy"}
                            hoverColor={"dodgerblue"}
                        />
                        <BigButton
                            onClick={() => gradeCard(64)}
                            text={"4 - Cake"}
                            hoverColor={"dodgerblue"}
                        />
                        <BigButton
                            onClick={suspendCard}
                            text={"Suspend"}
                            hoverColor={"indianred"}
                        />
                    </GradingButtonsContainer>
                )}
            </PlayContainer>
        </>
    );
}

export default Play;
