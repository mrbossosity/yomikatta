import styled from "styled-components";

import Deck from "./Deck";
import Play from "./Play";

const MainContainer = styled.div`
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
`;

function Main({ deckScreen, playScreen }) {
    return (
        <MainContainer>
            {deckScreen && <Deck />}
            {playScreen && <Play />}
        </MainContainer>
    );
}

export default Main;
