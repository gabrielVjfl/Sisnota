const express = require('express')

const authSecret = require('../secure/authSecret.json')

const jwt = require('jsonwebtoken')

module.exports = function PrivateRouteParams(req, res, next) {
   const {authorization} = req.headers

   if(!authorization) {
    return res.status(400).json({ errBackend: "Não Autorizado!" });
   }

  const token = authorization.replace("Bearer", "").trim()

  try {
    const data = jwt.verify(token, authSecret.secret)

    const {id} = data
    
      if(id == req.params.id) {

        req.userId = id

        return next()
        
        }

        else {
            res.status(401).send('Sem autorização!, Token Inválido!')
        }

  }
  catch(err) {
    res.status(400).json({ errBackend: "Não Autorizado!" });
  }
}