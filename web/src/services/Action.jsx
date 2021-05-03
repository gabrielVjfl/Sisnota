import React, {createContext, useReducer} from 'react'


import {UserReducer, Initial_State} from './Reducer'



export const UserContext = createContext()

export default ({children}) => {

   

    const [state, dispatch] = useReducer(UserReducer, Initial_State)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}