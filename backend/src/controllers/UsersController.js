const express = require("express");

const Model = require("../database/models");

const Users = Model.Users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authSecret = require("../secure/authSecret.json");

class UsersController {
  async create(req, res) {
    let regexEmail = /\S+@\S+\.\S+/;

    let emailValid = regexEmail.test(req.body.email);

    if (req.body.nome == "") {
      res.status(400).json({ errBackend: "Nome não pode ficar vázio" });
    } else if (req.body.nome.length <= 2) {
      res.status(400).json({ errBackend: "Nome tem que ter mais de 2 letras" });
    } else if (req.body.email == "") {
      res.status(400).json({ errBackend: "Email não pode ficar vázio" });
    } else if (req.body.password == "") {
      res.status(400).json({ errBackend: "Senha não pode ficar vázia" });
    } else if (req.body.password.length <= 4) {
      res
        .status(400)
        .json({ errBackend: "A senha tem que ter mais do que 4 caracteres!" });
    } else if (emailValid == false) {
      res.status(400).json({ errBackend: "Email inválido" });
    } else {
      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashedPassword;

      const { nome, email, password } = req.body;

      let existsEmail = await Users.findOne({ where: { email: email } });

      if (existsEmail) {
        res.status(400).json({ errBackend: "Email já cadastrado!" });
      } else {
        const data = {
          nome,
          email,
          password,
        };
        let user = await Users.create(data);

        user.password = undefined;

        const token = await jwt.sign({ id: user.id }, authSecret.secret, {
          expiresIn: 86400,
        });

        res.status(201).send({ user, token });
      }
    }
  }

  async login(req, res) {
    try {
      if (req.body.email == "") {
        res.status(400).json({ errBackend: "Email vázio" });
      } else if (req.body.password == "") {
        res.status(400).json({ errBackend: "Senha vázia" });
      } else {
        const { email, password } = req.body;

        let user = await Users.findOne({ where: { email: email } });

        if (!user) {
          res.status(401).json({ errBackend: "Usúario não encontrado" });
        } else if (!(await bcrypt.compare(password, user.password))) {
          res.status(401).json({ errBackend: "Senha incorreta!" });
        } else {
          const token = await jwt.sign({ id: user.id }, authSecret.secret, {
            expiresIn: 86400,
          });

          user.password = undefined;

          res.status(201).json({ user, token });
        }
      }
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
}
module.exports = new UsersController();
