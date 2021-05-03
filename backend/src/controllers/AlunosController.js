const express = require("express");

const Model = require("../database/models");

const Alunos = Model.Alunos;

const Notas = Model.Notas;

const Series = Model.Series;

const Users = Model.Users;

const Criptografia = require("../cripto/CpfCripto");

const validarCpf = require("validar-cpf");

class AlunosController {
  async create(req, res) {
    try {
      let validationCpf = validarCpf(req.body.cpf);

      if (validationCpf == false) {
        res.status(400).json({ errBackend: "Cpf inválido!" });
      } else {
        let cryptCpf = await Criptografia(req.body.cpf);
        req.body.cpf = cryptCpf;

        const {
          nome,
          numero_matricula,
          cpf,
          sexo,
          idade,
          telefone,
          endereco,
          SeriesId,
          UserId,
        } = req.body;

        let existsCpf = await Alunos.findOne({ where: { cpf: cpf } });

        let existsMatricula = await Alunos.findOne({
          where: { numero_matricula: numero_matricula },
        });

        if (existsCpf) {
          res.status(400).json({ errBackend: "Cpf já cadastrado!" });
        } else if (existsMatricula) {
          res
            .status(400)
            .json({ errBackend: "Número da matricula já existe!" });
        } else {
          const data = {
            nome,
            numero_matricula,
            cpf,
            sexo,
            idade,
            telefone,
            endereco,
            SeriesId,
            UserId,
          };
          let response = await Alunos.create(data);

          res.status(201).json(response);
        }
      }
    } catch (err) {
      res.status(400).json({ errBackend: "Deu erro" });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;

      const { page, temp } = req.query;

      let response = await Alunos.findAll({
        where: { UserId: id },
        limit: 5,
        offset: (page - 1) * 5,
        order: [["id", temp]],

        include: [{ model: Notas }, { model: Series }],
      });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro!" });
    }
  }
  async notas(req, res) {
    try {
      const { id } = req.params;

      let response = await Alunos.findAll({
        where: { id: id },
        include: [{ model: Notas }, { model: Series }],
      });

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
  async countAlunos(req, res) {
    try {
      let response = await Alunos.count();

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { myid } = req.query;

      const {
        nome,
        numero_matricula,
        cpf,
        sexo,
        idade,
        telefone,
        endereco,
        SeriesId,
      } = req.body;

      await Alunos.update(req.body, {
        where: {
          id: myid,
          UserId: id,
        },
      });
      res.status(200).json({ sucBackend: `Alterado com sucesso` });
    } catch (err) {}
  }
  async delete(req, res) {
    try {
      const { myid } = req.query;
      const { id } = req.params;

      await Alunos.destroy({
        where: {
          id: myid,
          UserId: id,
        },
      });

      res.status(200).json({ sucBackend: `Deletado com sucesso!` });
    } catch (err) {
      res.status(400).json(err);
    }
  }
  async indexParamsAlunos(req, res) {
    try {
      const { id } = req.params;

      let response = await Alunos.findOne({
        where: {
          id: id,
        },
      });

      res.status(200).json([response]);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}

module.exports = new AlunosController();
