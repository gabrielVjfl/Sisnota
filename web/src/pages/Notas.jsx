import React, {useContext} from 'react'
import Header from '../components/Header'
import ListAlunosNotas from '../components/ListAlunosNotas'
import {Container, TitlePage} from '../styles/Pages'
import {UserContext} from '../services/Action'
import PersistentData from '../utils/PersistentData'
const Notas = () => {

    const {state} = useContext(UserContext)

    return (
        <Container>
 <Header nameuser={state.dados.nome}/>
 <TitlePage>Notas</TitlePage>
 <ListAlunosNotas></ListAlunosNotas>
        </Container>
   
    )
}
export default PersistentData(Notas)