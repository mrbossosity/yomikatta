import styled from "styled-components";

const EditContainer = styled.button`
    background-color: #181818;
    font-size: 2rem;
    padding: 1rem;
    border: 2px solid #aaa;
    border-radius: 8px;
    color: #ccc;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
        border: 2px solid ${(props) => props.$hoverColor};
        color: ${(props) => props.$hoverColor};
    }
`;

function BigButton({ onClick, text, hoverColor }) {
    return (
        <EditContainer onClick={onClick} $hoverColor={hoverColor}>
            {text}
        </EditContainer>
    );
}

export default BigButton;
