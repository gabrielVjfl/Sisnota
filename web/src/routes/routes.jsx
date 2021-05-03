import React from 'react'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import PrivateRoute from './PrivateRoutes'
import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import Notas from '../pages/Notas'
import AddNotas from '../pages/AddNota'
import AddAlunos from '../pages/AddAluno'
import EditAluno from '../pages/EditAluno'
import EditNota from '../pages/EditNota'
const Routes = () => {
    return (
   <BrowserRouter>
   <Switch>
       <Route path="/" exact component={SignIn}></Route>
       <PrivateRoute path="/home" exact component={Home}></PrivateRoute>
       <PrivateRoute path="/notas/:id" exact component={Notas}></PrivateRoute>
       <PrivateRoute path="/add/notas/:id/:nome" exact component={AddNotas}/>
       <PrivateRoute path="/add/alunos" exact component={AddAlunos}/>
       <PrivateRoute path="/edit/aluno/:id" exact component={EditAluno}/>
       <PrivateRoute path="/edit/nota/:id" exact component={EditNota}/>
       <Redirect to="/"></Redirect>
   </Switch>
   </BrowserRouter>
    )
}
export default Routes