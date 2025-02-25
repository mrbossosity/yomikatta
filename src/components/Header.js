import styled from "styled-components";

const HeaderContainer = styled.header`
    padding: 1rem;
    font-size: 2rem;
    color: #bbb;
    display: flex;
    gap: 2rem;
`;

const Title = styled.div`
    font-weight: bold;
`;

const Nav = styled.div`
    cursor: pointer;
    transition: 0.1s;

    &:hover {
        color: #ddd;
    }
`;

function Header({ deckSelect, playSelect }) {
    return (
        <HeaderContainer>
            <Title>YomiKatta</Title>
            <Nav onClick={playSelect}>Play</Nav>
            <Nav onClick={deckSelect}>My Deck</Nav>
        </HeaderContainer>
    );
}

export default Header;
