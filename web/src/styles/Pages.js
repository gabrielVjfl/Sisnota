import styled from "styled-components";



   export const Container = styled.div`
    display: flex;
    flex-direction: column;
 
    max-width: 100vw;
    min-width: 100vw;
    min-height: 100vh;
  
    max-height: 100vh;
    background-color: #F1FAC9;
    text-align: center;
    overflow: auto;
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

export const TitlePage = styled.h3`
font-family: Helvetica;
margin-top: 20px;
margin-bottom: 20px;
`
export const Card = styled.div`

min-width: 60vw;
border-radius: 10px;

`

export const CardBody = styled.div`
`

export const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`