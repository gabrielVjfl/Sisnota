import React, {useContext} from 'react'
import Header from '../components/Header'
import ListAlunos from '../components/ListAlunos'
import {Container, TitlePage} from '../styles/Pages'

import PersistentData from '../utils/PersistentData'

const Home = () => {

  
    return (
        <Container>
 <Header/>
 <TitlePage>Alunos</TitlePage>
 <ListAlunos></ListAlunos>
        </Container>
   
    )
}
export default PersistentData(Home)