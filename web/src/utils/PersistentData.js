import React, {useEffect, useContext} from 'react'

import Axios from 'axios'

import {useHistory} from 'react-router-dom'

import { UserContext } from "../services/Action";


export default function PersistentData(WrappedComponent) {
  const Wrapper = (props) => {

    const {dispatch: userDispatch} = useContext(UserContext)
    
      const history = useHistory()

    useEffect(() => {
    let dataParse = sessionStorage.getItem('data')
    let tokenParse = sessionStorage.getItem('token')

    if (dataParse && tokenParse) {
      let dataJson = JSON.parse(dataParse)
      let tokenJson = JSON.parse(tokenParse)

       Axios.defaults.headers.Authorization = `Bearer ${tokenJson}`;

       userDispatch({
        type: 'SETdados',
        payload: {
          dados: dataJson
        }
      })

      userDispatch({
        type: 'SETtoken',
        payload: {
          token: tokenJson
        }
      })

      userDispatch({
        type: 'SETauth',
        payload: {
          auth: sessionStorage.getItem('token')
        },
      })
    }
    else {
      history.replace('/')
    }
      }, [])
  


      return <WrappedComponent {...props}/>
    }
    return Wrapper
  }
