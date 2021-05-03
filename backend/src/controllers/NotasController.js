const express = require("express");

const Model = require("../database/models");

const Notas = Model.Notas;

class NotasController {
  async create(req, res) {
    try {
      if (req.body.valor > 5) {
        req.body.status = "Aprovado";
      } else if (req.body.valor <= 5) {
        req.body.status = "Reprovado";
      }

      const { valor, status, AlunoId } = req.body;

      const data = {
        valor,
        status,
        AlunoId,
      };

      let response = await Notas.create(data);

      res.status(201).json(response);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
  async notasIndex(req, res) {
    try {
      const { id } = req.params;

      let response = await Notas.findOne({
        where: {
          id: id,
        },
      });

      res.status(200).json([response]);
    } catch (err) {
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;

      if (req.body.valor > 5) {
        req.body.status = "Aprovado";
      } else if (req.body.valor <= 5) {
        req.body.status = "Reprovado";
      }

      const { valor, status } = req.body;

      await Notas.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(200).json({ sucBackend: `Alterado com sucesso` });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }
}
module.exports = new NotasController();
