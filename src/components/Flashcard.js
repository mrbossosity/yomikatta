import styled from "styled-components";
import SmallButton from "./SmallButton";

const Card = styled.div`
    display: inline-block;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.$card?.suspended ? "#bbb" : "#ddd")};
    color: #181818;
`;

const Term = styled.div`
    font-size: 1.5rem;
`;

const Reading = styled.div`
    font-size: 1rem;
`;

const Definition = styled.div`
    font-size: 1rem;
`;

const ButtonsRow = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

function Flashcard({
    card,
    openEditModal,
    suspendCard,
    restoreCard,
    deleteCard,
}) {
    return (
        <Card $card={card}>
            <Term>{card.term}</Term>
            <Reading>{card.reading}</Reading>
            <Definition>{card.definition}</Definition>
            <ButtonsRow>
                <SmallButton
                    onClick={() => openEditModal(card)}
                    text={"Edit"}
                    hoverColor={"dodgerblue"}
                />
                {!card?.suspended && (
                    <SmallButton
                        onClick={() => suspendCard(card.id)}
                        text={"Suspend"}
                        hoverColor={"darkorange"}
                    />
                )}
                {card?.suspended && (
                    <SmallButton
                        onClick={() => restoreCard(card.id)}
                        text={"Restore"}
                        hoverColor={"mediumseagreen"}
                    />
                )}
                <SmallButton
                    onClick={() => deleteCard(card.id)}
                    text={"Delete"}
                    hoverColor={"indianred"}
                ></SmallButton>
            </ButtonsRow>
        </Card>
    );
}

export default Flashcard;
