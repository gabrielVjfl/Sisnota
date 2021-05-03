const express = require('express');

const authSecret = require('../secure/authSecret.json')

const jwt = require('jsonwebtoken')

module.exports = function PrivateRoute(req,res,next) {
  const {authorization} = req.headers 

  if(!authorization) {
      return res.status(400).json({errBackend: 'Não Autorizado!'})

    }
    const token = authorization.replace("Bearer", "").trim()

    try {
        const data = jwt.verify(token, authSecret.secret)

        const {id} = data

        req.userId = id

        next()
    }
    catch(err) {
        res.status(400).json({ errBackend: "Não Autorizado!" });
    }
}