import styled from "styled-components";

const EditContainer = styled.button`
    background-color: #eee;
    padding: 0.25rem;
    border: 1px solid #181818;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
        border: 1px solid ${(props) => props.$hoverColor};
        color: ${(props) => props.$hoverColor};
    }
`;

function SmallButton({ onClick, text, hoverColor }) {
    return (
        <EditContainer onClick={onClick} $hoverColor={hoverColor}>
            {text}
        </EditContainer>
    );
}

export default SmallButton;
