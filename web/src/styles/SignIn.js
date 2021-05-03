import styled from "styled-components";

import Walpaper2 from '../assets/walpaper2.jpeg'

   export const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 100vw;
    min-width: 100vw;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    background-size: cover;
    background-image: url(${Walpaper2});
    
    `


export const Title = styled.h1`
  font-family: Helvetica;
  color: yellow;
  margin-bottom: 20px;
`;

export const Phrase = styled.h2`
  font-family: "Nunito";
  font-weight: 500;
  color: white;
  margin-top: 40px;
`;

export const Card = styled.div`
min-width: 35vw;
border-radius: 10px;

`

export const CardBody = styled.div`
`